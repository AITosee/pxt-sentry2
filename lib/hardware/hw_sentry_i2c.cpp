#include "hw_sentry_i2c.h"
#include "../debug/debug_tool.h"
#include "../sentry_type.h"

#if MICROBIT_CODAL
#define BUFFER_TYPE uint8_t *
#else
#define BUFFER_TYPE char *
#endif

namespace tosee_sentry
{

  HwSentryI2C::HwSentryI2C(hw_i2c_t *i2c_port, uint32_t address)
      : sentry_address_(address)
  {
  }

  HwSentryI2C::~HwSentryI2C() {}

  uint32_t HwSentryI2C::I2CRead(uint8_t reg_address, uint8_t *temp)
  {
    uBit.i2c.write(sentry_address_ << 1, (BUFFER_TYPE)&reg_address, 1, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("[R:%02x,", reg_address);
#endif
    uBit.i2c.read(sentry_address_ << 1, (BUFFER_TYPE)temp, 1, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("%02x]\r\n", *temp);
#endif
    return SENTRY_OK;
  }

  uint32_t HwSentryI2C::I2CWrite(uint8_t reg_address, uint8_t value)
  {
    uint8_t buff[2] = {reg_address, value};

    uBit.i2c.write(sentry_address_ << 1, (BUFFER_TYPE)buff, 2, false);
    // Debug Output
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
    IPRINTF("[W:%02x,%02x]\r\n", reg_address, value);
#endif

    return SENTRY_OK;
  }

} // namespace tosee_sentry
