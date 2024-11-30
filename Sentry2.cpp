#include "pxt.h"
#include "Sentry2.h"

#if MICROBIT_CODAL
#define BUFFER_TYPE uint8_t *
#else
#define BUFFER_TYPE char *
#endif

uint32_t sentry_i2c_read(uint8_t address, uint8_t reg_address, uint8_t *temp)
{
    uBit.i2c.write(address << 1, (BUFFER_TYPE)&reg_address, 1, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("D:%02x\r\n", address);
    IPRINTF("R:%02x", reg_address);
#endif
    uBit.i2c.read(address << 1, (BUFFER_TYPE)temp, 1, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("%02x\r\n", *temp);
#endif
    return SENTRY_OK;
}

uint32_t sentry_i2c_write(uint8_t address, uint8_t reg_address, uint8_t value)
{
    uint8_t buff[2] = {reg_address, value};

    uBit.i2c.write(address << 1, (BUFFER_TYPE)buff, 2, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("W:%02x%02x\r\n", reg_address, value);
#endif

    return SENTRY_OK;
}

int sentry_serial_read(uint8_t *pkg_b, int len)
{
    int ret = 0;
    auto mode = SYNC_SLEEP;

    ret = uBit.serial.read(pkg_b, len, mode);

#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    DOPRINTF("R%d %02x\n", ret, pkg_b[0]);
#endif
    return ret > 0 ? 1 : 0;
}

void sentry_serial_write(const uint8_t *pkg_b, int len)
{
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    DOPRINTF("pkg_b[%d]", len);
    for (int i = 0; i < len; ++i)
    {
        DOPRINTF("%02x ", pkg_b[i]);
    }
    DOPRINTF("\n");
#endif
    uBit.serial.send((unsigned char *)pkg_b, len);
}

void sentry_debug_send(uint8_t *buffer, int bufferLen) {
  uBit.serial.send((unsigned char *)buffer, bufferLen);
}

namespace tosee_sentry
{
    Sentry2 sentry2;

    //%
    int sentry2_Begin(int mode, int addr)
    {
        return sentry2.begin((sentry_mode_e)mode, (uint8_t)addr);
    }

    //%
    int sentry2_LedSetColor(int detected_color, int undetected_color, int leval)
    {
        return sentry2.LedSetColor((sentry_led_color_e)detected_color, (sentry_led_color_e)undetected_color, leval);
    }

    //%
    int sentry2_CameraSetAwb(int awb)
    {
        return sentry2.CameraSetAwb((sentry_camera_white_balance_e)awb);
    }

    //%
    int sentry2_SetParamNum(int vision_type, int max_num)
    {
        return sentry2.SetParamNum((Sentry2::sentry_vision_e)vision_type, max_num);
    }

    //%
    int sentry2_SetParam(int vision_type, Buffer buff, int param_id)
    {
        if (buff->length == 10)
        {
            sentry_object_t param; 

            param.result_data1 = buff->data[0]<<8|buff->data[1];
            param.result_data2 = buff->data[2]<<8|buff->data[3];
            param.result_data3 = buff->data[4]<<8|buff->data[5];
            param.result_data4 = buff->data[6]<<8|buff->data[7];
            param.result_data5 = buff->data[8]<<8|buff->data[9];

            return sentry2.SetParam((Sentry2::sentry_vision_e)vision_type, &param, param_id);
        }
        
        return SENTRY_FAIL;
    }

    //%
    int sentry2_VisionSetStatus(int status, int vision_type)
    {
        if (status)
        {
            return sentry2.VisionBegin((Sentry2::sentry_vision_e)vision_type);
        }
        else
        {
            return sentry2.VisionEnd((Sentry2::sentry_vision_e)vision_type);
        }
    }

    //%
    int sentry2_GetValue(int vision_type, int obj, int obj_id)
    {
        return sentry2.GetValue((Sentry2::sentry_vision_e)vision_type, (sentry_obj_info_e)obj, obj_id);
    }

    //%
    String sentry2_GetQrCodeValue()
    {
        return PSTR(sentry2.GetQrCodeValue());
    }
}