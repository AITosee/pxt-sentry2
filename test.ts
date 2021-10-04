Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kI2CMode)
basic.forever(function () {
    serial.writeNumber(Sentry.Cols(SentryId.Sentry00))
    serial.writeLine("")
    serial.writeNumber(Sentry.Rows(SentryId.Sentry00))
    serial.writeLine("")
    basic.pause(100)
})

