#ifndef DEBUG_TOOL_H_
#define DEBUG_TOOL_H_

#include <stdio.h>
#ifdef SENTRY_MICRO_BIT
#include "pxt.h"
#else
#include <Arduino.h>
#endif
#if !defined(SENTRY_DEBUG_ENABLE)
#define SENTRY_DEBUG_ENABLE 1
#endif

#if SENTRY_DEBUG_ENABLE != 0
#if !defined(ERROR_OUTPUT)
#define ERROR_OUTPUT 1
#endif
#if !defined(WARNING_OUTPUT)
#define WARNING_OUTPUT 0
#endif
// LOG_OUTPUT:  1 -> Simple Output
//              2 -> Complete Output
#if !defined(LOG_OUTPUT)
#define LOG_OUTPUT 1
#endif
#endif /* SENTRY_DEBUG_ENABLE != 0 */

#ifdef MICRO_BIT
#define DOPRINTF(s, ...)                                                  \
    do                                                                    \
    {                                                                     \
        uint8_t buffer[300];                                              \
        int written = snprintf((char*)buffer, sizeof(buffer), s, ##__VA_ARGS__); \
        uBit.serial.send(buffer, written);                                \
    } while (0)
#else
#define DOPRINTF(s, ...)                                                  \
    do                                                                    \
    {                                                                     \
        char buffer[300];                                              \
        int written = snprintf((char*)buffer, sizeof(buffer), s, ##__VA_ARGS__); \
        Serial.print(buffer);                               \
    } while (0)
#endif

#if LOG_OUTPUT != 0
#define IPRINTF(s, ...) DOPRINTF(s, ##__VA_ARGS__)
#else
#define IPRINTF(s, ...)
#endif

#if WARNING_OUTPUT != 0
#define WPRINTF(s, ...) DOPRINTF("in file:%s, function:%s, line: %dW:" s"\r\n", \
                               __FILE__,                                                  \
                               __PRETTY_FUNCTION__,                                       \
                               __LINE__,                                                  \
                               ##__VA_ARGS__)
#else
#define WPRINTF(s, ...)
#endif

#if ERROR_OUTPUT != 0
#define EPRINTF(s, ...) DOPRINTF("in file:%s, function:%s, line: %dE:" s"\r\n", \
                               __FILE__,                                                  \
                               __PRETTY_FUNCTION__,                                       \
                               __LINE__,                                                  \
                               ##__VA_ARGS__)
#else
#define EPRINTF(s, ...)
#endif

#endif /* DEBUG_TOOL_H_ */
