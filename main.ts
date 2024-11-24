Sentry2VisionSensor.Begin(sentry_mode_e.kI2CMode, sentry2_addr_e.ADDR1)
Sentry2VisionSensor.VisionSetStatus(sentry2_status.Enable, sentry_vision_e.kVisionAprilTag)
Sentry2VisionSensor.SetParamNum(sentry_vision_e_2.kVisionColor, 4)
Sentry2VisionSensor.SetColorParam(50, 50, 3, 4, 1)
