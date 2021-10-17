let target_num = 0
Sentry.Begin(SentryId.Sentry00, sentry_mode_e.kI2CMode)
Sentry.VisionSetStatus(SentryId.Sentry00, SentryStatus.Enable, sentry_vision_e.kVisionCard)
Sentry.LedSetColor(SentryId.Sentry00, sentry_led_color_e.kLedBlue, sentry_led_color_e.kLedGreen)
basic.forever(function () {
    target_num = Sentry.Detected(SentryId.Sentry00, sentry_vision_e.kVisionCard)
    serial.writeValue("target_num", target_num)
    for (let index = 0; index <= target_num - 1; index++) {
        serial.writeValue("index", index)
        serial.writeValue("x", Sentry.GetValue(SentryId.Sentry00, sentry_vision_value.kVisionCard, sentry_gen_info_e.kXValue, index))
        serial.writeValue("y", Sentry.GetValue(SentryId.Sentry00, sentry_vision_value.kVisionCard, sentry_gen_info_e.kYValue, index))
        serial.writeValue("w", Sentry.GetValue(SentryId.Sentry00, sentry_vision_value.kVisionCard, sentry_gen_info_e.kWidthValue, index))
        serial.writeValue("h", Sentry.GetValue(SentryId.Sentry00, sentry_vision_value.kVisionCard, sentry_gen_info_e.kWidthValue, index))
        serial.writeValue("l", Sentry.GetValue(SentryId.Sentry00, sentry_vision_value.kVisionCard, sentry_gen_info_e.kLabel, index))
    }
    basic.pause(2000)
})
