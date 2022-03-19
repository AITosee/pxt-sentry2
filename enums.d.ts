declare const enum sentry_vision_e {
    //% block="Color"
    kVisionColor = 1,
    //% block="Blob"
    kVisionBlob = 2,
    //% block="AprilTag"
    kVisionAprilTag = 3,
    //% block="Line"
    kVisionLine = 4,
    //% block="Learning"
    kVisionLearning  = 5,
    //% block="Card"
    kVisionCard = 6,
    //% block="Face"
    kVisionFace = 7,
    //% block="20Classes"
    kVision20Classes = 8,
    //% block="QrCode"
    kVisionQrCode = 9,
    //% block="ObjTrack"
    //% blockHidden=true
    kVisionObjTrack = 10,
    //% block="MotionDetect"
    kVisionMotionDetect = 11,
    //% blockHidden=true
    kVisionMaxType
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
    //% blockHidden=true 
    kUnknownMode,
}

declare const enum sentry_coordinate_type_e {
    //% block="AbsoluteCoordinate"
    kAbsoluteCoordinate = 0,
    //% block="PercentageCoordinate"
    kPercentageCoordinate = 1,
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
    //% block="Forward"
    kCardForward = 1,
    //% block="Left"
    kCardLeft = 2,
    //% block="Right"
    kCardRight = 3,
    //% block="TurnAround"
    kCardTurnAround = 4,
    //% block="Park"
    kCardPark = 5,
    //% block="GreenLight"
    kCardGreenLight = 6,
    //% block="RedLight"
    kCardRedLight = 7,
    //% block="Speed40"
    kCardSpeed40 = 8,
    //% block="Speed60"
    kCardSpeed60 = 9,
    //% block="Speed80"
    kCardSpeed80 = 10,
    //% block="Check"
    kCardCheck = 11,
    //% block="Cross"
    kCardCross = 12,
    //% block="Circle"
    kCardCircle = 13,
    //% block="Square"
    kCardSquare = 14,
    //% block="Triangle"
    kCardTriangle = 15,
    //% block="Plus"
    kCardPlus = 16,
    //% block="Minus"
    kCardMinus = 17,
    //% block="Divide"
    kCardDivide = 18,
    //% block="Equal"
    kCardEqual = 19,
    //% block="0️⃣ 0"
    kCardZero = 20,
    //% block="1️⃣ 1"
    kCardOne = 21,
    //% block="2️⃣ 2"
    kCardTwo = 22,
    //% block="3️⃣ 3"
    kCardThree = 23,
    //% block="4️⃣ 4"
    kCardFour = 24,
    //% block="5️⃣ 5"
    kCardFive = 25,
    //% block="6️⃣ 6"
    kCardSix = 26,
    //% block="7️⃣ 7"
    kCardSeven = 27,
    //% block="8️⃣ 8"
    kCardEight = 28,
    //% block="9️⃣ 9"
    kCardNine = 29,
    //% block="A"
    kCardA = 31,
    //% block="B"
    kCardB = 32,
    //% block="C"
    kCardC = 33,
    //% block="D"
    kCardD = 34,
    //% block="E"
    kCardE = 35,
    //% block="F"
    kCardF = 36,
    //% block="G"
    kCardG = 37,
    //% block="H"
    kCardH = 38,
    //% block="I"
    kCardI = 39,
    //% block="J"
    kCardJ = 40,
    //% block="K"
    kCardK = 41,
    //% block="L"
    kCardL = 42,
    //% block="M"
    kCardM = 43,
    //% block="N"
    kCardN = 44,
    //% block="O"
    kCardO = 45,
    //% block="P"
    kCardP = 46,
    //% block="Q"
    kCardQ = 47,
    //% block="R"
    kCardR = 48,
    //% block="T"
    kCardS = 49,
    //% block="S"
    kCardT = 50,
    //% block="V"
    kCardU = 51,
    //% block="U"
    kCardV = 52,
    //% block="W"
    kCardW = 53,
    //% block="X"
    kCardX = 54,
    //% block="Y"
    kCardY = 55,
    //% block="Z"
    kCardZ = 56
}

declare const enum class20_label_e {
    //% block="Airplane"
    kAirplane = 1,
    //% block="Bicycle"
    kBicycle = 2,
    //% block="Bird"
    kBird = 3,
    //% block="Boat"
    kBoat = 4,
    //% block="Bottle"
    kBottle = 5,
    //% block="Bus"
    kBus = 6,
    //% block="Car"
    kCar = 7,
    //% block="Cat"
    kCat = 8,
    //% block="Chair"
    kChair = 9,
    //% block="Cow"
    kCow = 10,
    //% block="Table"
    kTable = 11,
    //% block="Dog"
    kDog = 12,
    //% block="Horse"
    kHorse = 13,
    //% block="MotorBike"
    kMotorBike = 14,
    //% block="Person"
    kPerson = 15,
    //% block="Plant"
    kPlant = 16,
    //% block="Sheep"
    kSheep = 17,
    //% block="Sofa"
    kSofa = 18,
    //% block="Train"
    kTrain = 19,
    //% block="Monitor"
    kMonitor = 20
}

declare const enum color_label_e {
    //% block="Black"
    kColorBlack = 1,
    //% block="White"
    kColorWhite = 2,
    //% block="Red"
    kColorRed = 3,
    //% block="Green"
    kColorGreen = 4,
    //% block="Blue"
    kColorBlue = 5,
    //% block="Yellow"
    kColorYellow = 6,
    //% block="Unkown"
    kColorUnkown = 7
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

declare const enum sentry_gen_info_e {
    //% block="horizontal"
    kXValue = 1,
    //% block="vertical"
    kYValue,
    //% block="width"
    kWidthValue,
    //% block="height"
    kHeightValue,
    //% block="label"
    kLabel
}

declare const enum sentry_qr_info_e {
    //% block="horizontal"
    kXValue = 1,
    //% block="vertical"
    kYValue,
    //% block="width"
    kWidthValue,
    //% block="height"
    kHeightValue
}

declare const enum sentry_color_info_e {
    //% block="red channel"
    kRValue = 6,
    //% block="green channel"
    kGValue = 7,
    //% block="blue channel"
    kBValue = 8,
    //% block="label"
    kLabel = 5
}

declare const enum sentry_addr_e {
    //% block="0x60"
    ADDR1 = 0x60,
    //% block="0x61"
    ADDR2 = 0x61,
    //% block="0x62"
    ADDR3 = 0x62,
    //% block="0x63"
    ADDR4 = 0x63,
}