
Sentry2VisionSensor.Begin(sentry_mode_e.kI2CMode, sentry2_addr_e.ADDR1)
Sentry2VisionSensor.CameraSetAwb(sentry_camera_white_balance_e.kAutoWhiteBalance)
Sentry2VisionSensor.VisionSetStatus(sentry2_status.Enable, sentry_vision_e.kVisionColor)
Sentry2VisionSensor.SetParamNum(sentry_vision_e_2.kVisionColor, 1)
Sentry2VisionSensor.SetColorParam(50, 50, 3, 4, 1)
Sentry2VisionSensor.SetBlobParam(3, 4, color_label_e.kColorRed, 1)
Sentry2VisionSensor.SetCustomParam(0, 0, 0, 0, 0, 1)
