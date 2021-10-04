
declare const enum sentry_vision_e {
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


declare const enum sentry_led_e {
    //% block="1"
    kLed1 = 0,
    //% block="2"
    kLed2 = 1,
    //% block="All"
    kLedAll = 2,
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
    Eisable = 0,
}

namespace Sentry {
    // sentry_reg
    const kRegDeviceId = 0x01
    const kRegFirmwareVersion = 0x02
    const kRegRestart = 0x03
    const kRegSensorConfig1 = 0x04
    const kRegLocconst = 0x05
    const kRegLed1 = 0x06
    const kRegLed2 = 0x07
    const kRegLedLevel = 0x08
    const kRegUart = 0x09
    const kRegUSBCongig = 0x0B
    const kRegHWConfig = 0x0F
    const kRegCameraConfig1 = 0x10
    const kRegCameraConfig2 = 0x11
    const kRegCameraConfig3 = 0x12
    const kRegCameraConfig4 = 0x13
    const kRegCameraConfig5 = 0x14
    const kRegFrameWidthH = 0x1B
    const kRegFrameWidthL = 0x1C
    const kRegFrameHeightH = 0x1D
    const kRegFrameHeightL = 0x1E
    const kRegFrameCount = 0x1F
    const kRegVisionId = 0x20
    const kRegVisionConfig1 = 0x21
    const kRegVisionConfig2 = 0x22
    const kRegParamNum = 0x23
    const kRegParamId = 0x24
    const kRegVisionStatus1 = 0x2A
    const kRegVisionStatus2 = 0x2B
    const kRegVisionDetect1 = 0x30
    const kRegVisionDetect2 = 0x31
    const kRegResultNumber = 0x34
    const kRegResultId = 0x35
    const kRegReadStatus1 = 0x36
    const kRegParamValue1H = 0x70
    const kRegParamValue1L = 0x71
    const kRegParamValue2H = 0x72
    const kRegParamValue2L = 0x73
    const kRegParamValue3H = 0x74
    const kRegParamValue3L = 0x75
    const kRegParamValue4H = 0x76
    const kRegParamValue4L = 0x77
    const kRegParamValue5H = 0x78
    const kRegParamValue5L = 0x79
    const kRegResultData1H = 0x80
    const kRegResultData1L = 0x81
    const kRegResultData2H = 0x82
    const kRegResultData2L = 0x83
    const kRegResultData3H = 0x84
    const kRegResultData3L = 0x85
    const kRegResultData4H = 0x86
    const kRegResultData4L = 0x87
    const kRegResultData5H = 0x88
    const kRegResultData5L = 0x89
    const kRegSn = 0xD0

    const SENTRY_DEVICE_ID = 0x04
    const SENTRY_FIRMWARE_VERSION = 0xFF

    const SENTRY_MAX_RESULT = 25

    const SENTRY_OK = 0x00
    const SENTRY_FAIL = 0x01
    const SENTRY_WRITE_TIMEOUT = 0x02
    const SENTRY_READ_TIMEOUT = 0x03
    const SENTRY_CHECK_ERROR = 0x04
    const SENTRY_UNSUPPORT_PARAM = 0x10
    const SENTRY_UNKNOWN_PROTOCOL = 0x11

    class Result {
        result_data1 = 0
        result_data2 = 0
        result_data3 = 0
        result_data4 = 0
        result_data5 = 0
        bytestr = ""
    }

    class VisionState {
        vision_type: sentry_vision_e
        frame = 0
        detect = 0
        //result = Result
        constructor(vision_type: sentry_vision_e) {
            this.vision_type = vision_type;
        }
    }


    class SentryStreamBase {
        _addr: number
        constructor(addr: number) {
            this._addr = addr;
        }

        Set(reg_address: number, value: number): number { return 0; }
        Get(reg_address: number): number { return 0; }
        Read(reg_address: number): number { return 0; }
        ReadQrCode(reg_address: number): number { return 0; }
        SetParam(vision_id: number, param: number[], param_id: number): number { return 0; }
    }

    class SentryI2CMethod extends SentryStreamBase {

        constructor(addr: number) {
            super(addr);
        }

        private i2cwrite(reg: number, value: number) {
            let buf = pins.createBuffer(2);
            buf[0] = reg;
            buf[1] = value;
            pins.i2cWriteBuffer(this._addr, buf);
        }

        private i2cread(reg: number) {
            pins.i2cWriteNumber(this._addr, reg, NumberFormat.UInt8BE);
            let val = pins.i2cReadNumber(this._addr, NumberFormat.UInt8BE);
            return val;
        }

        private get_u16_data(reg_L: number, reg_H: number): number {
            return 0;
        }

        Set(reg_address: number, value: number): number {
            this.i2cwrite(reg_address, value);
            return SENTRY_OK;
        }

        Get(reg_address: number): number {
            let value = this.i2cread(reg_address);
            return value;
        }

        Read(reg_address: number): number {
            return SENTRY_OK;
        }

        ReadQrCode(reg_address: number): number {
            return SENTRY_OK;
        }

        SetParam(vision_id: number, param: number[], param_id: number): number {
            let err = SENTRY_OK
            err = this.Set(kRegVisionId, vision_id)
            if (err) return err;

            err = this.Set(kRegParamId, param_id + 1)
            if (err) return err;

            this.Set(kRegParamValue1H, param[0])
            this.Set(kRegParamValue1H, param[1])
            this.Set(kRegParamValue2H, param[2])
            this.Set(kRegParamValue2H, param[3])
            this.Set(kRegParamValue3H, param[4])
            this.Set(kRegParamValue3H, param[5])
            this.Set(kRegParamValue4H, param[6])
            this.Set(kRegParamValue4H, param[7])
            this.Set(kRegParamValue5H, param[8])
            this.Set(kRegParamValue5H, param[9])

            return SENTRY_OK;
        }
    }

    class SentryUartMethod extends SentryStreamBase {

        constructor(addr: number) {
            super(addr);
        }

        Set(reg_address: number, value: number): number {
            return SENTRY_OK;
        }

        Get(reg_address: number): number {
            return 0;
        }

        Read(reg_address: number): number {
            return SENTRY_OK;
        }

        ReadQrCode(reg_address: number): number {
            return SENTRY_OK;
        }

        SetParam(vision_id: number, param: number[], param_id: number): number {
            return SENTRY_OK;
        }
    }

    class SentryMethod {
        _address: number
        _stream: SentryStreamBase
        _mode: sentry_mode_e
        _img_w = 0
        _img_h = 0

        constructor(addr: number) {
            this._address = addr
            this._mode = sentry_mode_e.kUnknownMode;
        }

        Begin(mode: sentry_mode_e) {
            if (mode == sentry_mode_e.kUnknownMode) {
                mode = sentry_mode_e.kI2CMode;
            }

            if (this._mode != mode) {
                this._mode = mode;
                if (mode == sentry_mode_e.kI2CMode) {
                    this._stream = new SentryI2CMethod(this._address);
                }
                else {
                    this._stream = new SentryUartMethod(this._address);
                }
            }

            return this.SensorInit();
        }

        SensorInit() {
            let err = SENTRY_OK;

            /* Check sensor startup*/
            err = this.SensorStartupCheck();
            if (err) return err;
            /* Check sentry protocol version */
            err = this.ProtocolVersionCheck();
            if (err) return err;
            /* Sensor set default if version is correction. */
            err = this.SensorSetDefault();
            if (err) return err;
            /* Get sensor image shape. */
            err = this.GetImageShape();
            if (err) return err;

            return SENTRY_OK;
        }

        SensorStartupCheck() {
            let err = SENTRY_OK;
            let err_count = 0;
            let start_up = 0
            do {
                if (++err_count > 100) return SENTRY_FAIL;  // set max retry times

                start_up = this._stream.Get(kRegSensorConfig1)
                if (start_up & 0x01) break

                basic.pause(200);

            } while (true)

            return err;
        }

        ProtocolVersionCheck() {
            let err = SENTRY_OK;
            let err_count = 0;
            let device_id = 0;
            while (true) {
                if (++err_count > 3) return SENTRY_UNKNOWN_PROTOCOL;
                device_id = this._stream.Get(kRegDeviceId);

                if (device_id == SENTRY_DEVICE_ID) break;
            }
            return err;
        }

        SensorSetDefault() {
            let err = SENTRY_OK;
            let sensor_config_reg_value = this._stream.Get(kRegSensorConfig1)

            sensor_config_reg_value |= 0x08
            err = this._stream.Set(kRegSensorConfig1,
                sensor_config_reg_value)
            while (true) {
                sensor_config_reg_value = this._stream.Get(kRegSensorConfig1)
                if (!(sensor_config_reg_value & 0x08)) {
                    break
                }
            }

            return err;
        }

        GetImageShape() {
            let err = SENTRY_OK;
            let tmp = [0, 0]

            err, tmp[0] = this._stream.Get(kRegFrameWidthL)
            if (err) return err;

            err, tmp[1] = this._stream.Get(kRegFrameWidthH)
            if (err) return err;

            this._img_w = tmp[1] << 8 | tmp[0]
            err, tmp[0] = this._stream.Get(kRegFrameHeightL)
            if (err) return err;

            err, tmp[1] = this._stream.Get(kRegFrameHeightH)
            if (err) return err;

            this._img_h = tmp[1] << 8 | tmp[0]

            return SENTRY_OK
        }

        Rows() {
            return this._img_h;
        }

        Cols() {
            return this._img_w;
        }

        VisionSetStatus(vision_type: sentry_vision_e, status: SentryStatus) {

        }


    }

    let pSentry: any[] = [null, null, null, null]

    /**
     * Begin Sentry.
     */
    //% blockId=Sentry_begin block="initialize%id|port%port"
    //% group="Settings"
    export function Begin(id: SentryId, port: sentry_mode_e) {
        if (pSentry[id] == null) {
            pSentry[id] = new SentryMethod(id + 0x60)
            pSentry[id].Begin(port);
        }
    }

    /**
     * Reset Sentry.
     */
    //% blockId=Sentry_set_default block="%id|restore default settings"
    //% group="Settings"
    export function setDefault(id: SentryId) {
        while (pSentry[id].SensorSetDefault() != SENTRY_OK);
    }
    /**
     * Sentry vision begin.
    */
    //% blockId=Sentry_vision_begin block="%id|%enable|algorithm%type"
    //% group="Settings"
    export function VisionSetStatus(id: SentryId, status: SentryStatus, vision_type: sentry_vision_e) {
        while (pSentry[id].VisionSetStatus(vision_type, status) != SENTRY_OK);
    }

    /**
    * set led color.
    * @param id Sentry id
    * @param led led type.
    * @param detected_color led color while sensor detected target.
    * @param undetected_color led color while sensor undetected target.
    */
    //% blockId=Sentry_led_set_color block="%id|LED %led|when detected %detected_color|when undetected %undetected_color"
    //% weight=200 inlineInputMode=inline
    //% group="Settings" advanced=true
    export function ledSetColor(id: SentryId, led: sentry_led_e, detected_color: sentry_led_color_e, undetected_color: sentry_led_color_e) {

    }

    /**
     * set camera zoom.
     * @param id Sentry id
     * @param zoom zoom value.
     */
    //% blockId=Sentry_camera_set_zoom block="%id|digital zoom%level"
    //% group="Settings" advanced=true
    export function cameraSetZoom(id: SentryId, zoom: sentry_camera_zoom_e) {

    }

    /**
    * set camera white balance.
    * @param id Sentry id
    * @param wb white balance type.
    */
    //% blockId=Sentry_camera_set_awb block="%id|white balance%wb"
    //% group="Settings" advanced=true
    export function cameraSetAwb(id: SentryId, wb: sentry_camera_white_balance_e) {

    }

    /**
     * set camera FPS.
     * @param id Sentry id
     * @param on FPS type.
     */
    //% blockId=Sentry_camera_set_fps block="%id|high FPS mode$on"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="Settings" advanced=true
    export function cameraSetFPS(id: SentryId, on: boolean) {

    }

    /**
    * get vision result data, this function will update vision result automatically.
    * @param id Sentry id
    * @param vision_type: vision type.
    * @param object_inf:  object information
    */
    //% blockId=Sentry_get_value
    export function getValue(id: SentryId, vision_type: sentry_vision_e, object_inf: sentry_obj_info_e) {

    }
}
