declare const enum sentry_vision_detected {
    kVisionColor = 1,
    kVisionBlob = 2,
    kVisionAprilTag = 3,
    kVisionLine = 4,
    kVisionBody = 5,
    kVisionCard = 6,
    kVisionFace = 7,
    kVision20Classes = 8,
    kVisionQrCode = 9,
    kVisionObjTrack = 10,
    kVisionMotionDetect = 11,
}

declare const enum sentry_vision_value {
    kVisionBlob = 2,
    kVisionAprilTag = 3,
    kVisionLine = 4,
    kVisionBody = 5,
    kVisionCard = 6,
    kVisionFace = 7,
    kVision20Classes = 8,
    kVisionObjTrack = 10,
    kVisionMotionDetect = 11,
}

declare const enum sentry_led_color_e {
    //% block="off"
    kLedClose = 0,
    //% block="red"
    kLedRed = 1,
    //% block="green"
    kLedGreen = 2,
    //% block="yellow"
    kLedYellow = 3,
    //% block="blue"
    kLedBlue = 4,
    //% block="purple"
    kLedPurple = 5,
    //% block="cyan"
    kLedCyan = 6,
    //% block="white"
    kLedWhite = 7,
}

declare const enum sentry_mode_e {
    //% block="SerialMode"
    kSerialMode = 0,
    //% block="I2CMode"
    kI2CMode = 1,
    //% block="Default"
    kUnknownMode,
}


declare const enum sentry_baudrate_e {
    //% block="9600"
    kBaud9600 = 0x00,
    //% block="19200"
    kBaud19200 = 0x01,
    //% block="38400"
    kBaud38400 = 0x02,
    //% block="57600"
    kBaud57600 = 0x03,
    //% block="115200"
    kBaud115200 = 0x04,
    //% block="921600"
    kBaud921600 = 0x05,
    //% block="1152000"
    kBaud1152000 = 0x06,
    //% block="2000000"
    kBaud2000000 = 0x07,
}

declare const enum sentry_camera_zoom_e {
    //% block="Auto"
    kZoomDefault = 0,
    //% block="Level1"
    kZoom1 = 1,
    //% block="Level2"
    kZoom2 = 2,
    //% block="Level3"
    kZoom3 = 3,
    //% block="Level4"
    kZoom4 = 4,
    //% block="Level5"
    kZoom5 = 5,
}

declare const enum sentry_camera_config_e {
    //% block="Auto"
    kLevelDefault = 0,
    //% block="Level1"
    kLevel1 = 1,
    //% block="Level2"
    kLevel2 = 2,
    //% block="Level3"
    kLevel3 = 3,
    //% block="Level4"
    kLevel4 = 4,
    //% block="Level5"
    kLevel5 = 5,
    //% block="Level6"
    kLevel6 = 6,
    //% block="Level7"
    kLevel7 = 7,
    //% block="Level8"
    kLevel8 = 8,
    //% block="Level9"
    kLevel9 = 9,
    //% block="Level10"
    kLevel10 = 10,
}

declare const enum sentry_camera_fps_e {
    //% block="FPSNorma"
    kFPSNormal = 0,
    //% block="FPSHigh"
    kFPSHigh = 1,
}


declare const enum sentry_camera_white_balance_e {
    //% block="AutoWhiteBalance"
    kAutoWhiteBalance = 0,
    //% block="LockWhiteBalance"
    kLockWhiteBalance = 1,
    //% block="WhiteLight"
    kWhiteLight = 2,
    //% block="YellowLight"
    kYellowLight = 3,
    //% block="WhiteBalanceCalibrating"
    kWhiteBalanceCalibrating = 4,
}

declare const enum card_label_e {
    kCardForward = 1,
    kCardLeft = 2,
    kCardRight = 3,
    kCardTurnAround = 4,
    kCardPark = 5,
    kCardGreenLight = 6,
    kCardRedLight = 7,
    kCardSpeed40 = 8,
    kCardSpeed60 = 9,
    kCardSpeed80 = 10,
    kCardCheck = 11,
    kCardCross = 12,
    kCardCircle = 13,
    kCardSquare = 14,
    kCardTriangle = 15,
    kCardPlus = 16,
    kCardMinus = 17,
    kCardDivide = 18,
    kCardEqual = 19,
    kCardZero = 20,
    kCardOne = 21,
    kCardTwo = 22,
    kCardThree = 23,
    kCardFour = 24,
    kCardFive = 25,
    kCardSix = 26,
    kCardSeven = 27,
    kCardEight = 28,
    kCardNine = 29,
    kCardA = 31,
    kCardB = 32,
    kCardC = 33,
    kCardD = 34,
    kCardE = 35,
    kCardF = 36,
    kCardG = 37,
    kCardH = 38,
    kCardI = 39,
    kCardJ = 40,
    kCardK = 41,
    kCardL = 42,
    kCardM = 43,
    kCardN = 44,
    kCardO = 45,
    kCardP = 46,
    kCardQ = 47,
    kCardR = 48,
    kCardS = 49,
    kCardT = 50,
    kCardU = 51,
    kCardV = 52,
    kCardW = 53,
    kCardX = 54,
    kCardY = 55,
    kCardZ = 56
}

declare const enum class20_label_e {
    kAirplane = 1,
    kBicycle = 2,
    kBird = 3,
    kBoat = 4,
    kBottle = 5,
    kBus = 6,
    kCar = 7,
    kCat = 8,
    kChair = 9,
    kCow = 10,
    kTable = 11,
    kDog = 12,
    kHorse = 13,
    kMotorBike = 14,
    kPerson = 15,
    kPlant = 16,
    kSheep = 17,
    kSofa = 18,
    kTrain = 19,
    kMonitor = 20
}

declare const enum color_label_e {
    kColorBlack = 1,
    kColorWhite = 2,
    kColorRed = 3,
    kColorGreen = 4,
    kColorBlue = 5,
    kColorYellow = 6
}

declare const enum SentryId {
    //% block="Sentry00"
    Sentry00 = 0,
    //% block="Sentry01"
    Sentry01 = 1,
    //% block="Sentry10"
    Sentry10 = 2,
    //% block="Sentry11"
    Sentry11 = 3,
}

declare const enum SentryStatus {
    //% block="enable"
    Enable = 1,
    //% block="disable"
    Disable = 0,
}

declare const enum sentry_obj_info_e {
    //% block="status"
    kStatus = 0,
    //% block="x position"
    kXValue = 1,
    //% block="y position"
    kYValue = 2,
    //% block="width"
    kWidthValue = 3,
    //% block="height"
    kHeightValue = 4,
    //% block="label"
    kLabel = 5,
    //% block="red channel"
    kRValue = 6,
    //% block="green channel"
    kGValue = 7,
    //% block="blue channel"
    kBValue = 8,
}

declare const enum Params {
    //% block="horizontal"
    Horizontal = 1,
    //% block="vertical"
    Vertical,
    //% block="width"
    Width,
    //% block="height"
    Height,
    //% block="label"
    Lable
}

declare const enum QrParams {
    //% block="horizontal"
    Horizontal = 1,
    //% block="vertical"
    Vertical,
    //% block="width"
    Width,
    //% block="height"
    Height
}

declare const enum ColorParams {
    //% block="red channel"
    RedChannal = 6,
    //% block="green channel"
    GreenChannal = 7,
    //% block="blue channel"
    BlueChannal = 8,
    //% block="label"
    Label = 5
}
