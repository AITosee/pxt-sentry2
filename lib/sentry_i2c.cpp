#include "sentry_i2c.h"

extern uint32_t sentry_i2c_read(uint8_t address, uint8_t reg_address, uint8_t *temp);
extern uint32_t sentry_i2c_write(uint8_t address, uint8_t reg_address, uint8_t value);

static sentry_err_t sentry_i2c_get(uint8_t address, const uint8_t reg_address, uint8_t *value)
{
  return sentry_i2c_read(address, reg_address, value);
}

static sentry_err_t sentry_i2c_set(uint8_t address, const uint8_t reg_address, const uint8_t value)
{
  return sentry_i2c_write(address, reg_address, value);
}

static sentry_err_t sentry_i2c_read(uint8_t address, int vision_type, sentry_vision_state_t *vision_state)
{
  sentry_err_t err;
  uint8_t result_data_tmp[2];
  err = sentry_i2c_set(address, kRegVisionId, vision_type);
  if (err)
    return err;
  err = sentry_i2c_get(address, kRegFrameCount, &vision_state->frame);
  if (err)
    return err;
  err = sentry_i2c_get(address, kRegResultNumber, &vision_state->detect);
  if (err)
    return err;
  if (!vision_state->detect)
    return SENTRY_OK;
  vision_state->detect = SENTRY_MAX_RESULT < vision_state->detect
                             ? SENTRY_MAX_RESULT
                             : vision_state->detect;
  for (uint8_t i = 0; i < vision_state->detect; ++i)
  {
    err = sentry_i2c_set(address, kRegResultId, i + 1);
    if (err)
      return err;
    sentry_i2c_get(address, kRegResultData1L, result_data_tmp);
    sentry_i2c_get(address, kRegResultData1H, result_data_tmp + 1);
    vision_state->vision_result[i].result_data1 =
        result_data_tmp[1] << 8 | result_data_tmp[0];
    sentry_i2c_get(address, kRegResultData2L, result_data_tmp);
    sentry_i2c_get(address, kRegResultData2H, result_data_tmp + 1);
    vision_state->vision_result[i].result_data2 =
        result_data_tmp[1] << 8 | result_data_tmp[0];
    sentry_i2c_get(address, kRegResultData3L, result_data_tmp);
    sentry_i2c_get(address, kRegResultData3H, result_data_tmp + 1);
    vision_state->vision_result[i].result_data3 =
        result_data_tmp[1] << 8 | result_data_tmp[0];
    sentry_i2c_get(address, kRegResultData4L, result_data_tmp);
    sentry_i2c_get(address, kRegResultData4H, result_data_tmp + 1);
    vision_state->vision_result[i].result_data4 =
        result_data_tmp[1] << 8 | result_data_tmp[0];
    sentry_i2c_get(address, kRegResultData5L, result_data_tmp);
    sentry_i2c_get(address, kRegResultData5H, result_data_tmp + 1);
    vision_state->vision_result[i].result_data5 =
        result_data_tmp[1] << 8 | result_data_tmp[0];
  }
  return SENTRY_OK;
}

static sentry_err_t sentry_i2c_set_param(uint8_t address, int vision_type, sentry_object_t *param, int param_id)
{
  sentry_err_t err;
  uint8_t result_data_tmp[2];

  err = sentry_i2c_set(address, kRegVisionId, vision_type);
  if (err)
    return err;
  err = sentry_i2c_set(address, kRegParamId, param_id);
  if (err)
    return err;
  sentry_i2c_set(address, kRegParamValue1H, (param->result_data1 >> 8) & 0xFF);
  sentry_i2c_set(address, kRegParamValue1L, param->result_data1 & 0xFF);
  sentry_i2c_set(address, kRegParamValue2H, (param->result_data2 >> 8) & 0xFF);
  sentry_i2c_set(address, kRegParamValue2L, param->result_data2 & 0xFF);
  sentry_i2c_set(address, kRegParamValue3H, (param->result_data3 >> 8) & 0xFF);
  sentry_i2c_set(address, kRegParamValue3L, param->result_data3 & 0xFF);
  sentry_i2c_set(address, kRegParamValue4H, (param->result_data4 >> 8) & 0xFF);
  sentry_i2c_set(address, kRegParamValue4L, param->result_data4 & 0xFF);
  sentry_i2c_set(address, kRegParamValue5H, (param->result_data5 >> 8) & 0xFF);
  sentry_i2c_set(address, kRegParamValue5L, param->result_data5 & 0xFF);

  return SENTRY_OK;
}

static sentry_err_t sentry_i2c_read_qrcode(uint8_t address, int vision_type, sentry_qrcode_state_t *qrcode)
{
  sentry_err_t err;
  uint8_t result_data_tmp[2];

  err = sentry_i2c_set(address, kRegVisionId, vision_type);
  if (err)
    return err;
  err = sentry_i2c_get(address, kRegFrameCount, &qrcode->frame);
  if (err)
    return err;
  err = sentry_i2c_get(address, kRegResultNumber, &qrcode->detect);
  if (err)
    return err;
  if (!qrcode->detect)
    return SENTRY_OK;
  err = sentry_i2c_set(address, kRegResultId, 1);
  if (err)
    return err;
  sentry_i2c_get(address, kRegResultData1L, result_data_tmp);
  sentry_i2c_get(address, kRegResultData1H, result_data_tmp + 1);
  qrcode->qrcode_result[0].x_value =
      result_data_tmp[1] << 8 | result_data_tmp[0];
  sentry_i2c_get(address, kRegResultData2L, result_data_tmp);
  sentry_i2c_get(address, kRegResultData2H, result_data_tmp + 1);
  qrcode->qrcode_result[0].y_value =
      result_data_tmp[1] << 8 | result_data_tmp[0];
  sentry_i2c_get(address, kRegResultData3L, result_data_tmp);
  sentry_i2c_get(address, kRegResultData3H, result_data_tmp + 1);
  qrcode->qrcode_result[0].width = result_data_tmp[1] << 8 | result_data_tmp[0];
  sentry_i2c_get(address, kRegResultData4L, result_data_tmp);
  sentry_i2c_get(address, kRegResultData4H, result_data_tmp + 1);
  qrcode->qrcode_result[0].height =
      result_data_tmp[1] << 8 | result_data_tmp[0];
  sentry_i2c_get(address, kRegResultData5L, result_data_tmp);
  sentry_i2c_get(address, kRegResultData5H, result_data_tmp + 1);
  qrcode->qrcode_result[0].length =
      result_data_tmp[1] << 8 | result_data_tmp[0];
  for (uint16_t i = 0; i < qrcode->qrcode_result[0].length; ++i)
  {
    uint8_t result_id = i / 5 + 2;
    uint8_t offset = i % 5;
    if (0 == i % 5)
    {
      err = sentry_i2c_set(address, kRegResultId, result_id);
    }
    if (err)
      return err;
    sentry_i2c_get(address, kRegResultData1L + 2 * offset, (uint8_t *)(qrcode->qrcode_result[0].str + i));
  }
  qrcode->qrcode_result[0].str[qrcode->qrcode_result[0].length] = 0;

  return SENTRY_OK;
}

static sentry_err_t sentry_i2c_write(uint8_t address, int vision_type, const sentry_vision_state_t *vision_state)
{
  sentry_err_t err = SENTRY_OK;

  if (vision_state->detect >= SENTRY_MAX_RESULT)
  {
    return SENTRY_FAIL;
  }

  err = sentry_i2c_set(address, kRegVisionId, vision_type);
  if (err)
    return err;
  err = sentry_i2c_set(address, kRegResultNumber, vision_state->detect);
  if (err)
    return err;
  for (uint8_t i = 0; i < vision_state->detect; ++i)
  {
    sentry_i2c_set(address, kRegResultId, i + 1);
    sentry_i2c_set(address, kRegResultData1L, vision_state->vision_result[i].result_data1 & 0xFF);
    sentry_i2c_set(address, kRegResultData1H, (vision_state->vision_result[i].result_data1 >> 8) & 0xFF);
    sentry_i2c_set(address, kRegResultData2L, vision_state->vision_result[i].result_data2 & 0xFF);
    sentry_i2c_set(address, kRegResultData2H, (vision_state->vision_result[i].result_data2 >> 8) & 0xFF);
    sentry_i2c_set(address, kRegResultData3L, vision_state->vision_result[i].result_data3 & 0xFF);
    sentry_i2c_set(address, kRegResultData3H, (vision_state->vision_result[i].result_data3 >> 8) & 0xFF);
    sentry_i2c_set(address, kRegResultData4L, vision_state->vision_result[i].result_data4 & 0xFF);
    sentry_i2c_set(address, kRegResultData4H, (vision_state->vision_result[i].result_data4 >> 8) & 0xFF);
    sentry_i2c_set(address, kRegResultData5L, vision_state->vision_result[i].result_data5 & 0xFF);
    sentry_i2c_set(address, kRegResultData5H, (vision_state->vision_result[i].result_data5 >> 8) & 0xFF);
  }

  return err;
}

void sentry_i2c_init(sentry_stream_base_t *stream)
{
  stream->Get = sentry_i2c_get;
  stream->Set = sentry_i2c_set;
  stream->SetParam = sentry_i2c_set_param;
  stream->Read = sentry_i2c_read;
  stream->ReadQrCode = sentry_i2c_read_qrcode;
  stream->Write = sentry_i2c_write;
}