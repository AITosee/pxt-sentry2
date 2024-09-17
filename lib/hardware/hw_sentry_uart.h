#ifndef HW_SENTRY_UART_H_
#define HW_SENTRY_UART_H_

#include<stdint.h>
#include "pxt.h"

namespace tosee_sentry {

class HwSentryUart {
 public:
  typedef int* hw_uart_t;
  HwSentryUart(hw_uart_t hw_port);
  virtual ~HwSentryUart();
  HwSentryUart(const HwSentryUart&) = delete;
  HwSentryUart& operator=(const HwSentryUart &) = delete;

  virtual int available(void);
  virtual int read(uint8_t* buf, int length);
  virtual int write(uint8_t* buf, int length);
};

}  // namespace tosee_sentry

#endif /* HW_SENTRY_UART_H_ */
