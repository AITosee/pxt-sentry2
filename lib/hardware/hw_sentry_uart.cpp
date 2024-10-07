#include <stdio.h>

#include "../debug/debug_tool.h"
#include "hw_sentry_uart.h"

namespace tosee_sentry {

HwSentryUart::HwSentryUart(hw_uart_t hw_port)
{
  
}

HwSentryUart::~HwSentryUart() {
}

int HwSentryUart::available(void) {
  return uBit.serial.getRxBufferSize();
}

int HwSentryUart::read(uint8_t* buf, int length) {
  int ret = 0;
  auto mode = SYNC_SLEEP;

  ret = uBit.serial.read(buf, length, mode);

  return ret;
}

int HwSentryUart::write(uint8_t* buf, int length) {
#if SENTRY_DEBUG_ENABLE && LOG_OUTPUT
  for (unsigned int i = 0; i < length; ++i) {
    printf("%02x,", buf[i]);
  }
#endif
  uBit.serial.send(buf, length);
  return 0;
}

}  // namespace tosee_sentry
