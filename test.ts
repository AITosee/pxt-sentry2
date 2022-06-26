let target_num = 0
Sentry.Begin(sentry_mode_e.kI2CMode,0x60)
Sentry.VisionSetStatus( SentryStatus.Enable, sentry_vision_e.kVisionCard)
basic.forever(function () {
    target_num = Sentry.Detected( sentry_vision_e.kVisionCard)
    serial.writeValue("target_num", target_num)
    for (let index = 1; index <= target_num; index++) {
        serial.writeValue("index", index)
        serial.writeValue("x", Sentry.GetValue( sentry_vision_e.kVisionCard, sentry_gen_info_e.kXValue, index))
        serial.writeValue("y", Sentry.GetValue( sentry_vision_e.kVisionCard, sentry_gen_info_e.kYValue, index))
        serial.writeValue("w", Sentry.GetValue( sentry_vision_e.kVisionCard, sentry_gen_info_e.kWidthValue, index))
        serial.writeValue("h", Sentry.GetValue( sentry_vision_e.kVisionCard, sentry_gen_info_e.kWidthValue, index))
        serial.writeValue("l", Sentry.GetValue( sentry_vision_e.kVisionCard, sentry_gen_info_e.kLabel, index))
    }
    basic.pause(2000)
})
