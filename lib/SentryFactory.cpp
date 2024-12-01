#include "SentryFactory.h"

int SentryFactory_MallocVisionBuffer(SentryFactory *factory, int vision_type)
{
  if (vision_type && vision_type < factory->vision_max_type)
  {
    if (factory->vision_qrcode_type == vision_type && factory->qrcode_state == NULL)
    {
      factory->qrcode_state = (sentry_qrcode_state_t *)malloc(sizeof(sentry_qrcode_state_t));
      return factory->qrcode_state != NULL;
    }
    else if (factory->vision_state[vision_type - 1] == NULL)
    {
      factory->vision_state[vision_type - 1] = (sentry_vision_state_t *)malloc(sizeof(sentry_vision_state_t));
      return factory->vision_state[vision_type - 1] != NULL;
    }
  }
  return 0;
}

int SentryFactory_FreeVisionBuffer(SentryFactory *factory, int vision_type)
{
  if (vision_type && vision_type < factory->vision_max_type)
  {
    if (factory->vision_qrcode_type == vision_type && factory->qrcode_state != NULL)
    {
      free(factory->qrcode_state);
      factory->qrcode_state = NULL;
    }
    else if (factory->vision_state[vision_type - 1] != NULL)
    {
      free(factory->vision_state[vision_type - 1]);
      factory->vision_state[vision_type - 1] = NULL;
    }
  }
  return 1;
}

void SentryFactory_Init(SentryFactory *factory, uint8_t address, uint8_t device_id,
                        sentry_vision_state_t **vision_state, int vision_max_type,
                        int vision_qrcode_type)
{
  factory->device_id = device_id;
  factory->vision_max_type = vision_max_type;
  factory->vision_qrcode_type = vision_qrcode_type;
  factory->vision_state = vision_state;
  factory->stream.address = address;
  factory->mode = kUnknownMode;
  factory->img_w = 0;
  factory->img_h = 0;
  factory->qrcode_state = NULL;
}

void SentryFactory_Free(SentryFactory *factory)
{
  for (int i = 1; i < factory->vision_max_type; i++)
  {
    SentryFactory_FreeVisionBuffer(factory, i);
  }
}

uint8_t SentryFactory_SensorStartupCheck(SentryFactory *factory)
{
  sentry_sensor_conf_t conf1;
  int err_count = 0;
  sentry_err_t err;
  for (;;)
  {
    if (++err_count > 100)
      return SENTRY_FAIL;
    err = Sentry_Stream_Get(factory->stream, kRegSensorConfig1, &conf1.sensor_config_reg_value);
    if (!err && conf1.start_up)
      break;
    int32_t delay = 1000000;
    while (delay--)
      ;
  }
  return err;
}

uint8_t SentryFactory_ProtocolVersionCheck(SentryFactory *factory)
{
  uint8_t device_id = 0;
  int err_count = 0;
  sentry_err_t err;
  for (;;)
  {
    if (++err_count > 3)
      return SENTRY_UNKNOWN_PROTOCOL;
    err = Sentry_Stream_Get(factory->stream, kRegDeviceId, &device_id);
    if (!err && device_id == factory->device_id)
      break;
  }
  return err;
}

uint8_t SentryFactory_GetImageShape(SentryFactory *factory)
{
  sentry_err_t err;
  uint8_t tmp[2] = {0};

  err = Sentry_Stream_Get(factory->stream, kRegFrameWidthL, tmp);
  if (err)
    return err;
  err = Sentry_Stream_Get(factory->stream, kRegFrameWidthH, tmp + 1);
  if (err)
    return err;
  factory->img_w = tmp[1] << 8 | tmp[0];
  err = Sentry_Stream_Get(factory->stream, kRegFrameHeightL, tmp);
  if (err)
    return err;
  err = Sentry_Stream_Get(factory->stream, kRegFrameHeightH, tmp + 1);
  if (err)
    return err;
  factory->img_h = tmp[1] << 8 | tmp[0];

  return SENTRY_OK;
}

uint8_t SentryFactory_SensorInit(SentryFactory *factory, int set_default)
{
  sentry_err_t err;

  err = SentryFactory_SensorStartupCheck(factory);
  if (err)
    return err;
  err = SentryFactory_ProtocolVersionCheck(factory);
  if (err)
    return err;
  if (set_default)
  {
    err = SentryFactory_SensorSetDefault(factory, 1);
    if (err)
      return err;
  }
  err = SentryFactory_GetImageShape(factory);
  if (err)
    return err;

  return SENTRY_OK;
}

uint8_t SentryFactory_Begin(SentryFactory *factory, sentry_mode_e mode, int set_default)
{
  sentry_err_t err = SENTRY_OK;

  if (factory->mode == mode)
  {
    return SENTRY_OK;
  }
  else if (mode == kSerialMode)
  {
    sentry_uart_init(&factory->stream.base);
  }
  else if (mode == kI2CMode)
  {
    sentry_i2c_init(&factory->stream.base);
  }

  err = SentryFactory_SensorInit(factory, set_default);
  if (err)
  {
    return err;
  }
  
  factory->mode = mode;

  return err;
}

uint8_t SentryFactory_VisionSetStatus(SentryFactory *factory, int vision_type, int enable)
{
  sentry_err_t err;
  sentry_vision_conf1_t vision_config1;

  err = Sentry_Stream_Set(factory->stream, kRegVisionId, vision_type);
  if (err)
    return err;
  err =
      Sentry_Stream_Get(factory->stream, kRegVisionConfig1, &vision_config1.vision_config_reg_value);
  if (err)
    return err;
  if (vision_config1.status != enable)
  {
    vision_config1.status = enable;
    err =
        Sentry_Stream_Set(factory->stream, kRegVisionConfig1, vision_config1.vision_config_reg_value);
    if (err)
      return err;
  }
  if (enable)
  {
    SentryFactory_MallocVisionBuffer(factory, vision_type);
  }
  else
  {
    SentryFactory_FreeVisionBuffer(factory, vision_type);
  }

  return SENTRY_OK;
}

// Advance interface
uint8_t SentryFactory_VisionBegin(SentryFactory *factory, int vision_type)
{
  sentry_err_t err;
  int max_num;

  /* Set Max Result */
  max_num = SentryFactory_GetParamNum(factory, vision_type);
  if (0 > max_num)
  {
    return SENTRY_FAIL;
  }
  else if (SENTRY_MAX_RESULT < max_num || 0 == max_num)
  {
    err = SentryFactory_SetParamNum(factory, vision_type, SENTRY_MAX_RESULT);
  }
  err = SentryFactory_VisionSetStatus(factory, vision_type, 1);
  if (err)
    return err;

  return SENTRY_OK;
}

uint8_t SentryFactory_VisionEnd(SentryFactory *factory, int vision_type)
{
  return SentryFactory_VisionSetStatus(factory, vision_type, 0);
}

int SentryFactory_read(SentryFactory *factory, int vision_type, sentry_obj_info_e obj_info,
                       uint8_t obj_id)
{
  uint8_t vision_idx = vision_type - 1;

  if (obj_id < 1 || obj_id > SENTRY_MAX_RESULT)
  {
    return 0;
  }
  obj_id -= 1;
  if (!factory->vision_state[vision_idx] || vision_idx >= factory->vision_max_type)
    return 0;
  switch (obj_info)
  {
  case kStatus:
    return factory->vision_state[vision_idx]->detect;
  case kXValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].x_value;
  case kYValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].y_value;
  case kWidthValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].width;
  case kHeightValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].height;
  case kLabel:
    return factory->vision_state[vision_idx]->vision_result[obj_id].label;
  case kGValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].color_g_value;
  case kRValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].color_r_value;
  case kBValue:
    return factory->vision_state[vision_idx]->vision_result[obj_id].color_b_value;
  default:
    return 0;
  }
}

int SentryFactory_readQrCode(SentryFactory *factory, sentry_obj_info_e obj_info)
{
  switch (obj_info)
  {
  case kStatus:
    return factory->qrcode_state->detect;
  case kXValue:
    return factory->qrcode_state->qrcode_result[0].x_value;
  case kYValue:
    return factory->qrcode_state->qrcode_result[0].y_value;
  case kWidthValue:
    return factory->qrcode_state->qrcode_result[0].width;
  case kHeightValue:
    return factory->qrcode_state->qrcode_result[0].height;
  case kLabel:
  case kGValue:
  case kRValue:
  case kBValue:
    /* not support */
    return 0;
  default:
    return 0;
  }
}

uint8_t SentryFactory_UpdateResult(SentryFactory *factory, int vision_type)
{
  sentry_err_t err;
  uint8_t frame;

  /* Must make sure register is unlock! */
  while (SENTRY_OK != SentryFactory_SensorLockReg(factory, 0))
    ;
  err = Sentry_Stream_Get(factory->stream, kRegFrameCount, &frame);
  if (err)
    return SENTRY_FAIL;
  if (factory->vision_qrcode_type == vision_type && factory->qrcode_state)
  {
    if (frame != factory->qrcode_state->frame)
    {
      sentry_qrcode_state_t qrcode_state;
      while (SENTRY_OK != SentryFactory_SensorLockReg(factory, 1))
        ;
      err = Sentry_Stream_ReadQrCode(factory->stream, factory->vision_qrcode_type, &qrcode_state);
      while (SENTRY_OK != SentryFactory_SensorLockReg(factory, 0))
        ;
      if (err)
        return err;
      memcpy(factory->qrcode_state, &qrcode_state, sizeof(sentry_qrcode_state_t));
    }
    else
    {
      /* Result not update */
      return SENTRY_FAIL;
    }
  }
  else if (factory->vision_state[vision_type - 1])
  {
    if (frame != factory->vision_state[vision_type - 1]->frame)
    {
      sentry_vision_state_t vision_state;
      while (SENTRY_OK != SentryFactory_SensorLockReg(factory, 1))
        ;
      err = Sentry_Stream_Read(factory->stream, vision_type, &vision_state);
      while (SENTRY_OK != SentryFactory_SensorLockReg(factory, 0))
        ;
      if (err)
        return err;
      memcpy(factory->vision_state[vision_type - 1], &vision_state,
             sizeof(sentry_vision_state_t));
    }
    else
    {
      /* Result not update */
      return SENTRY_FAIL;
    }
  }
  else
  {
    /* Vision uninitialize */
    return SENTRY_FAIL;
  }

  return SENTRY_OK;
}

int SentryFactory_GetValue(SentryFactory *factory, int vision_type, sentry_obj_info_e obj_info,
                           int obj_id)
{
  if (obj_info == kStatus)
  {
    if ((factory->vision_qrcode_type == vision_type && factory->qrcode_state == NULL) ||
        (factory->vision_qrcode_type != vision_type &&
         factory->vision_state[vision_type - 1] == NULL))
    {
      /* Vison not enable */
      return 0;
    }
    while (SentryFactory_UpdateResult(factory, vision_type))
      ;
  }

  if (factory->vision_qrcode_type == vision_type)
  {
    return SentryFactory_readQrCode(factory, obj_info);
  }
  else
  {
    return SentryFactory_read(factory, vision_type, obj_info, obj_id);
  }
}

int SentryFactory_GetParamNum(SentryFactory *factory, int vision_type)
{
  sentry_err_t err;
  uint8_t max_num;

  err = Sentry_Stream_Set(factory->stream, kRegVisionId, vision_type);
  if (err)
    return -1;
  err = Sentry_Stream_Get(factory->stream, kRegParamNum, &max_num);
  if (err)
    return -1;

  return (int)max_num;
}

uint8_t SentryFactory_SetParamNum(SentryFactory *factory, int vision_type, int max_num)
{
  sentry_err_t err;

  max_num = max_num > SENTRY_MAX_RESULT ? SENTRY_MAX_RESULT : max_num;
  err = Sentry_Stream_Set(factory->stream, kRegVisionId, vision_type);
  if (err)
    return err;

  err = Sentry_Stream_Set(factory->stream, kRegParamNum, max_num);

  return err;
}

const sentry_vision_state_t *SentryFactory_GetVisionState(SentryFactory *factory, int vision_type)
{
  return factory->vision_state[vision_type - 1];
}

uint8_t SentryFactory_VisionSetDefault(SentryFactory *factory, int vision_type)
{
  sentry_err_t err;
  sentry_vision_conf1_t vision_config1;

  err = Sentry_Stream_Set(factory->stream, kRegVisionId, vision_type);
  if (err)
    return err;
  err =
      Sentry_Stream_Get(factory->stream, kRegVisionConfig1, &vision_config1.vision_config_reg_value);
  if (err)
    return err;
  vision_config1.default_setting = 1;
  err = Sentry_Stream_Set(factory->stream, kRegVisionConfig1, vision_config1.vision_config_reg_value);
  if (err)
    return err;
  while (vision_config1.default_setting)
  {
    err = Sentry_Stream_Get(factory->stream, kRegVisionConfig1,
                            &vision_config1.vision_config_reg_value);
    if (err)
      return err;
  }

  return SENTRY_OK;
}

uint8_t SentryFactory_VisionSetMode(SentryFactory *factory, int vision_type, int mode)
{
  sentry_err_t err;
  sentry_vision_conf2_t vision_config2;

  err = Sentry_Stream_Set(factory->stream, kRegVisionId, vision_type);
  if (err)
    return err;
  err =
      Sentry_Stream_Get(factory->stream, kRegVisionConfig2, &vision_config2.value);
  if (err)
    return err;
  if (vision_config2.mode != mode)
  {
    vision_config2.mode = mode;
    err = Sentry_Stream_Set(factory->stream, kRegVisionConfig2, vision_config2.value);
  }
  return err;
}

uint8_t SentryFactory_SensorSetRestart(SentryFactory *factory)
{
  sentry_err_t err;
  err = Sentry_Stream_Set(factory->stream, kRegRestart, 1);
  return err;
}

uint8_t SentryFactory_SensorSetDefault(SentryFactory *factory, int vision_default_only)
{
  sentry_sensor_conf_t sensor_config1;
  sentry_err_t err;

  err =
      Sentry_Stream_Get(factory->stream, kRegSensorConfig1, &sensor_config1.sensor_config_reg_value);
  if (err)
    return err;
  if (vision_default_only)
  {
    sensor_config1.disable_vison = 1;
    err =
        Sentry_Stream_Set(factory->stream, kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
    while (sensor_config1.disable_vison)
    {
      err = Sentry_Stream_Get(factory->stream, kRegSensorConfig1,
                              &sensor_config1.sensor_config_reg_value);
      if (err)
        return err;
    }
  }
  else
  {
    sensor_config1.default_setting = 1;
    err =
        Sentry_Stream_Set(factory->stream, kRegSensorConfig1, sensor_config1.sensor_config_reg_value);
    while (sensor_config1.default_setting)
    {
      err = Sentry_Stream_Get(factory->stream, kRegSensorConfig1,
                              &sensor_config1.sensor_config_reg_value);
      if (err)
        return err;
    }
  }

  return err;
}

uint8_t SentryFactory_SeneorSetCoordinateType(SentryFactory *factory, sentry_coordinate_type_e type)
{
  sentry_hw_conf_t reg;
  sentry_err_t err;

  err = Sentry_Stream_Get(factory->stream, kRegHWConfig, &reg.value);
  if (err)
    return err;
  if (type != reg.coordinate)
  {
    reg.coordinate = type;
    err = Sentry_Stream_Set(factory->stream, kRegHWConfig, reg.value);
  }

  return err;
}

uint8_t SentryFactory_SensorLockReg(SentryFactory *factory, int lock)
{
  sentry_err_t err = SENTRY_OK;
  uint8_t status;
  for (;;)
  {
    Sentry_Stream_Get(factory->stream, kRegLock, &status);
    if (err)
      return err;
    if (status == lock)
    {
      return SENTRY_OK;
    }
    err = Sentry_Stream_Set(factory->stream, kRegLock, lock);
    if (err)
      return err;
  }
  return err;
}

// LED functions
uint8_t SentryFactory_LedSetColor(SentryFactory *factory, sentry_led_color_e detected_color,
                                  sentry_led_color_e undetected_color,
                                  uint8_t level)
{
  sentry_led_conf_t led_config;
  sentry_err_t err;
  uint8_t led_level;
  uint8_t manual;

  /* Set LED brightness level */
  err = Sentry_Stream_Get(factory->stream, kRegLedLevel, &led_level);
  if (err)
    return err;
  err = Sentry_Stream_Set(factory->stream, kRegLedLevel, (led_level & 0xF0) | (level & 0x0F));
  if (err)
    return err;
  /* Set LED color */
  err = Sentry_Stream_Get(factory->stream, kRegLedConfig, &led_config.led_reg_value);
  if (err)
    return err;
  if (detected_color == undetected_color)
  {
    manual = 1;
  }
  else
  {
    manual = 0;
  }
  if (led_config.detected_color != detected_color ||
      led_config.undetected_color != undetected_color ||
      led_config.manual != manual)
  {
    led_config.detected_color = detected_color;
    led_config.undetected_color = undetected_color;
    led_config.manual = manual;
    err = Sentry_Stream_Set(factory->stream, kRegLedConfig, led_config.led_reg_value);
    if (err)
      return err;
  }

  return err;
}


uint8_t SentryFactory_CameraSetAwb(SentryFactory *factory, sentry_camera_white_balance_e awb)
{
  sentry_camera_conf1_t camera_config1;
  sentry_err_t err;
  err = Sentry_Stream_Get(factory->stream, kRegCameraConfig1, &camera_config1.camera_reg_value);
  if (err)
    return err;
  camera_config1.white_balance = awb;
  err = Sentry_Stream_Set(factory->stream, kRegCameraConfig1, camera_config1.camera_reg_value);
  return err;
}
