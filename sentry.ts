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

namespace Sentry {
    // sentry_reg
    const kRegDeviceId = 0x01
    const kRegFirmwareVersion = 0x02
    const kRegRestart = 0x03
    const kRegSensorConfig1 = 0x04
    const kRegLock = 0x05
    const kRegLed = 0x06
    const kRegLedLevel = 0x08
    const kRegUart = 0x09
    const kRegUSBCongig = 0x0B
    const kRegLcdCongig = 0x0C
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
    const kRegsentry_object_tNumber = 0x34
    const kRegsentry_object_tId = 0x35
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
    const kRegsentry_object_tData1H = 0x80
    const kRegsentry_object_tData1L = 0x81
    const kRegsentry_object_tData2H = 0x82
    const kRegsentry_object_tData2L = 0x83
    const kRegsentry_object_tData3H = 0x84
    const kRegsentry_object_tData3L = 0x85
    const kRegsentry_object_tData4H = 0x86
    const kRegsentry_object_tData4L = 0x87
    const kRegsentry_object_tData5H = 0x88
    const kRegsentry_object_tData5L = 0x89
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

    class sentry_object_t {
        data1: number
        data2: number
        data3: number
        data4: number
        data5: number
        bytestr: string

        constructor() {
            this.data1 = 0;
            this.data2 = 0;
            this.data3 = 0;
            this.data4 = 0;
            this.data5 = 0;
            this.bytestr = "";
        }
    }

    class sentry_vision_state_t {
        vision_type: sentry_vision_e
        frame: number
        detect: number
        sentry_object_t: any[]
        constructor(vision_type: sentry_vision_e) {
            this.vision_type = vision_type;
            this.frame = 0;
            this.detect = 0;
            this.sentry_object_t = [
                null, null, null, null, null, 
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,];
                
            for(let i=0;i<SENTRY_MAX_RESULT;i++) {
                this.sentry_object_t[i] = new sentry_object_t();
            }
        }
    }

    class SentryI2CMethod {

        _addr: number
        constructor(addr: number) {
            this._addr = addr;
        }

        private i2cwrite(reg: number, value: number) {
            let buf = pins.createBuffer(2);
            buf[0] = reg;
            buf[1] = value;

            let ret =  pins.i2cWriteBuffer(this._addr, buf);

            console.log("i2cwrite " + this._addr.toString() + " reg:" + reg.toString() + "\t" + value.toString() + "\n")

            return ret;
        }

        private i2cread(reg: number) {
            pins.i2cWriteNumber(this._addr, reg, NumberFormat.UInt8BE, true);
            let value = pins.i2cReadNumber(this._addr, NumberFormat.UInt8BE);
            console.log("i2cread " + this._addr.toString() + " reg:" + reg.toString() + "\t" + value.toString() + "\n")

            return value;
        }

        private Get_u16(reg_L: number, reg_H: number): [number, number] {
            let err = SENTRY_OK;
            let tmp = [0, 0];

            [err, tmp[0]] = this.Get(reg_L);

            [err, tmp[1]] = this.Get(reg_H);

            return [err, (tmp[1] << 8 | tmp[0])];
        }

        Set(reg_address: number, value: number): number {
            this.i2cwrite(reg_address, value);
            return SENTRY_OK;
        }

        Get(reg_address: number): [number, number] {
            let value = this.i2cread(reg_address);

            return [SENTRY_OK, value];
        }

        Read(vision_type: sentry_vision_e, vision_state: sentry_vision_state_t): [number, sentry_vision_state_t] {
            let err = SENTRY_OK;

            err = this.Set(kRegVisionId, vision_type);

            if (err) return [err, vision_state];

            [err, vision_state.frame] = this.Get(kRegFrameCount)
            if (err) return [err, vision_state];

            [err, vision_state.detect] = this.Get(kRegsentry_object_tNumber)
            if (err) return [err, vision_state];

            if (!vision_state.detect) {
                if (err) return [SENTRY_OK, vision_state];
            }

            if (SENTRY_MAX_RESULT > vision_state.detect) {
                vision_state.detect = SENTRY_MAX_RESULT;
            }

            if (sentry_vision_e.kVisionQrCode == vision_type) {
                vision_state.detect = 1;
            }

            for (let i = 0; i < vision_state.detect; i++) {
                err = this.Set(kRegsentry_object_tId, i + 1);
                if (err) return [err, vision_state];

                [err, vision_state.sentry_object_t[i].data1] = this.Get_u16(
                    kRegsentry_object_tData1L, kRegsentry_object_tData1H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_object_t[i].data2] = this.Get_u16(
                    kRegsentry_object_tData2L, kRegsentry_object_tData2H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_object_t[i].data3] = this.Get_u16(
                    kRegsentry_object_tData3L, kRegsentry_object_tData3H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_object_t[i].data4] = this.Get_u16(
                    kRegsentry_object_tData4L, kRegsentry_object_tData4H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_object_t[i].data5] = this.Get_u16(
                    kRegsentry_object_tData5L, kRegsentry_object_tData5H)
                if (err) return [err, vision_state];
            }

            return [SENTRY_OK, vision_state]
        }

        ReadQrCode(vision_state: sentry_vision_state_t): [number, sentry_vision_state_t] {
            let err = SENTRY_OK;
            let bytec = 0;
            let sentry_object_t_id = 0;
            let offset = 0;

            vision_state.sentry_object_t[0].bytestr = "";

            [err, vision_state] = this.Read(sentry_vision_e.kVisionQrCode, vision_state)

            for (let i = 0; i < vision_state.sentry_object_t[0].data5; i++) {
                sentry_object_t_id = (i / 5 + 2) | 0;
                offset = i % 5;
                if (0 == i % 5) {
                    err = this.Set(kRegsentry_object_tId, sentry_object_t_id)
                    if (err) return [err, vision_state];
                }

                [err, bytec] = this.Get(kRegsentry_object_tData1L + 2 * offset)
                if (err) return [err, vision_state];

                vision_state.sentry_object_t[0].bytestr += String.fromCharCode(bytec)
            }
            return [SENTRY_OK, vision_state];
        }

        SetParam(vision_id: number, param: sentry_object_t, param_id: number): number {
            let err = SENTRY_OK
            err = this.Set(kRegVisionId, vision_id)
            if (err) return err;

            err = this.Set(kRegParamId, param_id + 1)
            if (err) return err;

            this.Set(kRegParamValue1H, (param.data1 >> 8) & 0xFF)
            this.Set(kRegParamValue1H, param.data1)
            this.Set(kRegParamValue2H, (param.data2 >> 8) & 0xFF)
            this.Set(kRegParamValue2H, param.data2)
            this.Set(kRegParamValue3H, (param.data3 >> 8) & 0xFF)
            this.Set(kRegParamValue3H, param.data3)
            this.Set(kRegParamValue4H, (param.data4 >> 8) & 0xFF)
            this.Set(kRegParamValue4H, param.data4)
            this.Set(kRegParamValue5H, (param.data5 >> 8) & 0xFF)
            this.Set(kRegParamValue5H, param.data5)

            return SENTRY_OK;
        }
    }

    class SentryUartMethod {

        Set(reg_address: number, value: number): number {
            return SENTRY_OK;
        }

        Get(reg_address: number): [number, number] {
            return [0,0];
        }

        Read(vision_type: sentry_vision_e, vision_state: sentry_vision_state_t): [number, sentry_vision_state_t] {
            return [SENTRY_OK, vision_state];
        }

        ReadQrCode(vision_state: sentry_vision_state_t): [number, sentry_vision_state_t] {
            return [SENTRY_OK, vision_state];
        }

        SetParam(vision_id: number, param: sentry_object_t, param_id: number): number {
            return SENTRY_OK;
        }
    }

    class SentryMethod {
        _address: number;
        _stream: SentryI2CMethod|SentryUartMethod;
        _mode: sentry_mode_e;
        _vision_states: any[];
        
        img_w = 0;
        img_h = 0;
        constructor(addr: number) {
            this._address = addr
            this._mode = sentry_mode_e.kUnknownMode;
            this._vision_states = [null, null, null, null, null, null, null, null, null, null, null, null]
        }

        Begin(mode: sentry_mode_e): number {
            if (mode == sentry_mode_e.kUnknownMode) {
                mode = sentry_mode_e.kI2CMode;
            }

            if (this._mode != mode) {
                this._mode = mode;
                if (mode == sentry_mode_e.kI2CMode) {
                    this._stream = new SentryI2CMethod(this._address);
                }
                else {
                    this._stream = new SentryUartMethod();
                }
            }

            if (this.SensorInit()) {
                return SENTRY_FAIL;
            }

            return SENTRY_OK;
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
            let start_up = 0;
            while (true) {
                if (++err_count > 100) return SENTRY_FAIL;  // set max retry times

                [err,start_up] = this._stream.Get(kRegSensorConfig1);
                if (start_up & 0x01) break;

                basic.pause(200);
            }

            return err;
        }

        ProtocolVersionCheck() {
            let err = SENTRY_OK;
            let err_count = 0;
            let device_id = 0;
            while (true) {
                if (++err_count > 3) return SENTRY_UNKNOWN_PROTOCOL;
                [err,device_id] = this._stream.Get(kRegDeviceId);

                if (device_id == SENTRY_DEVICE_ID) break;
            }
            return err;
        }

        SensorSetDefault() {
            let [err,sensor_config_reg_value] = this._stream.Get(kRegSensorConfig1);

            sensor_config_reg_value |= 0x08;
            err = this._stream.Set(kRegSensorConfig1, sensor_config_reg_value);
            while (true) {
                [err, sensor_config_reg_value] = this._stream.Get(kRegSensorConfig1);
                if(err) return err;

                if (!(sensor_config_reg_value & 0x08)) {
                    break;
                }
            }

            return err;
        }

        SensorSetRestart() {
            let err = this._stream.Set(kRegRestart, 1);
            if (err) return err;

            return SENTRY_OK;
        }

        GetImageShape() {
            let err = SENTRY_OK;
            let tmp = [0, 0];

            [err,tmp[0]] = this._stream.Get(kRegFrameWidthL);
            [err,tmp[1]] = this._stream.Get(kRegFrameWidthH);
            if (err) return err;
            
            this.img_w = tmp[1] << 8 | tmp[0];

            [err,tmp[0]] = this._stream.Get(kRegFrameHeightL);
            [err,tmp[1]] = this._stream.Get(kRegFrameHeightH);
            if (err) return err;

            this.img_h = tmp[1] << 8 | tmp[0];

            return SENTRY_OK
        }

        VisionSetStatus(vision_type: sentry_vision_e, enable: SentryStatus) {
            let err = SENTRY_OK;
            let vision_config1 = 0;

            err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            [err, vision_config1] = this._stream.Get(kRegVisionConfig1);
            if (err) return err;

            let status = vision_config1 & 0x01
            if (status != enable) {
                vision_config1 &= 0xfe
                vision_config1 |= enable & 0x01;
            } 

            err = this._stream.Set(kRegVisionConfig1, vision_config1);
            if (err) return err;

            if (enable && this._vision_states[vision_type] == null) {
                this._vision_states[vision_type] = new sentry_vision_state_t(vision_type);
            }
            
            return SENTRY_OK;
        }

        VisionGetStatus(vision_type: sentry_vision_e) {
            let err = SENTRY_OK;
            let vision_config1 = 0;

            err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            [err, vision_config1] = this._stream.Get(kRegVisionConfig1);
            if (err) return err;

            return 0x01 & vision_config1
        }

        GetValue(vision_type:sentry_vision_e, obj_info:sentry_obj_info_e , obj_id: number = 0){
            /*
            Note: when getting the vision status, if the block is true, it will wait until the vision_type result is updated
            */
            if (obj_info == sentry_obj_info_e.kStatus){
                let err = 1;
                while (err) {
                    let err = this.UpdateResult(vision_type)
                    basic.pause(200);
                }
            }

            return this.read(vision_type, obj_info, obj_id)
        }

        GetQrCodeValue(){
            let vision_state = this._vision_states[sentry_vision_e.kVisionQrCode - 1]
            if (vision_state == null)
                return ""

            return vision_state.result[0].bytestr
        }

        SetParamNum(vision_type: sentry_vision_e, max_num: number){
            let err = SENTRY_OK;

            err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            err = this._stream.Set(kRegParamNum, max_num);
            
            return err;
        }

        SetParam(vision_type: sentry_vision_e, param: sentry_object_t, param_id: number = 0){
            return this._stream.SetParam(vision_type, param, param_id)
        }

        _SensorLockkReg(lock: SentryStatus){
            let err = SENTRY_OK;
            let status = 0;

            for (; ;) {
                [err,status] = this._stream.Get(kRegLock);
                if (err) return err;
                if (status == lock) {
                    return SENTRY_OK;
                }
                err = this._stream.Set(kRegLock, lock);
                if (err) return err;
            }
        }
            
        UpdateResult(vision_type:sentry_vision_e){
            if (vision_type >= sentry_vision_e.kVisionMaxType)
                return 0;

            let vision_state = this._vision_states[vision_type - 1];

            let [err, frame] = this._stream.Get(kRegFrameCount);
            if (err) return err;

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Disable));

            if (frame == vision_state.frame)
                return SENTRY_FAIL;

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Enable));

            if (vision_type == sentry_vision_e.kVisionQrCode) {
                [err, vision_state] = this._stream.ReadQrCode(vision_state);
            }
            else {
                [err, vision_state] = this._stream.Read(vision_type, vision_state);
            }

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Disable));

            return SENTRY_OK;
        }

        read(vision_type:sentry_vision_e, obj_info:sentry_obj_info_e , obj_id:number = 0){
            let vision_pointer = vision_type - 1;

            if (obj_id >= SENTRY_MAX_RESULT) obj_id = SENTRY_MAX_RESULT-1;

            if (null == this._vision_states[vision_pointer] || vision_pointer >= sentry_vision_e.kVisionMaxType)
                return 0;

            switch (obj_info) {
                case sentry_obj_info_e.kStatus:
                    return this._vision_states[vision_pointer].detect;
                case sentry_obj_info_e.kXValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].x_value * 100 / this.img_w;
                case sentry_obj_info_e.kYValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].y_value * 100 / this.img_h;
                case sentry_obj_info_e.kWidthValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].width * 100 / this.img_w;
                case sentry_obj_info_e.kHeightValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].height * 100 / this.img_h;
                case sentry_obj_info_e.kLabel:
                    return this._vision_states[vision_pointer].vision_result[obj_id].label;
                case sentry_obj_info_e.kGValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].color_g_value;
                case sentry_obj_info_e.kRValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].color_r_value;
                case sentry_obj_info_e.kBValue:
                    return this._vision_states[vision_pointer].vision_result[obj_id].color_b_value;
                default:
                    return 0;
            }
        }

        VisionSetDefault(vision_type: sentry_vision_e) {
            let err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            return SENTRY_OK;
        }

        LedSetMode(manual: SentryStatus, hold: SentryStatus){
            let err = SENTRY_OK;
            let led_reg_value = 0;

            [err, led_reg_value] = this._stream.Get(kRegLed)
            if (err) return err;

            let gmanual = led_reg_value & 0x01
            let ghold = (led_reg_value >> 4) & 0x01

            if (manual != gmanual || hold != ghold){
                led_reg_value &= 0xfe
                led_reg_value |= manual & 0x01

                led_reg_value &= 0xef
                led_reg_value |= (hold & 0x01) << 4

                err = this._stream.Set(kRegLed, led_reg_value)
                if (err) return err;
            }

            return SENTRY_OK
        }
        
        LedSetColor( detected_color: sentry_led_color_e, undetected_color: sentry_led_color_e, level: number = 1){
            let err = SENTRY_OK;
            let led_reg_value = 0;
            let led_level = 0;
            
            [err, led_level] = this._stream.Get(kRegLedLevel)
            if (err) return err;

            [err, led_reg_value] = this._stream.Get(kRegLed)
            if (err) return err;

            led_level = (led_level & 0xF0) | (level & 0x0F);
            this._stream.Set(kRegLedLevel, led_level)

            led_reg_value &= 0xf1
            led_reg_value |= (detected_color & 0x07) << 1

            led_reg_value &= 0x1f
            led_reg_value |= (undetected_color & 0x07) << 5

            err = this._stream.Set(kRegLed, led_reg_value)
            if (err) return err;

            return SENTRY_OK
        }

        LcdSetMode(manual: SentryStatus) {
            let err = SENTRY_OK;
            let led_reg_value = 0;

            [err, led_reg_value] = this._stream.Get(kRegLcdCongig)
            if (err) return err;

            let gmanual = led_reg_value & 0x01

            if (manual != gmanual) {
                led_reg_value &= 0xfe
                led_reg_value |= manual & 0x01

                err = this._stream.Set(kRegLcdCongig, led_reg_value)
                if (err) return err;
            }

            return SENTRY_OK
        }

        CameraSetZoom(zoom:sentry_camera_zoom_e){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let gzoom = camera_reg_value & 0x07
            if (zoom != gzoom){
                camera_reg_value &= 0xf8
                camera_reg_value |= zoom & 0x07
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetZoom(){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return camera_reg_value & 0x07
        }

        CameraSetRotate(enable: SentryStatus){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let rotate = (camera_reg_value >> 3) & 0x01
            if (rotate != enable) {
                camera_reg_value &= 0xf7
                camera_reg_value |= (enable & 0x01) << 3
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetRotate(){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return (camera_reg_value >> 3) & 0x01
        }

        CameraSetFPS(fps:sentry_camera_fps_e){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let gfps = (camera_reg_value >> 4) & 0x01
            if (fps != gfps) {
                camera_reg_value &= 0xef
                camera_reg_value |= (fps & 0x01) << 4
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetFPS(){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return (camera_reg_value >> 4) & 0x01
        }

        CameraSetAwb(awb:sentry_camera_white_balance_e){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let white_balance = (camera_reg_value >> 5) & 0x03
            if (sentry_camera_white_balance_e.kLockWhiteBalance == awb) {
                camera_reg_value &= 0x1f
                camera_reg_value |= (awb & 0x03) << 5
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
                while ((camera_reg_value >> 7) == 0){
                    [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
                    if (err) return err;
                }
            }
            else if (white_balance != awb){
                camera_reg_value &= 0x1f
                camera_reg_value |= (awb & 0x03) << 5
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetAwb(){
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return (camera_reg_value >> 5) & 0x03
        }

        CameraSetBrightness(level: sentry_camera_config_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig3);
            if (err) return err;

            let glevel = camera_reg_value & 0x0f
            if (level != glevel) {
                camera_reg_value &= 0xf0
                camera_reg_value |= level & 0x0f
                err = this._stream.Set(kRegCameraConfig3, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetBrightness() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig3);
            if (err) return err;

            return camera_reg_value & 0x07
        }

        CameraSetContrast(level: sentry_camera_config_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig3);
            if (err) return err;

            let glevel = (camera_reg_value & 0xf0) >> 4
            if (level != glevel) {
                camera_reg_value &= 0x0f
                camera_reg_value |= (level & 0xf0)<<4
                err = this._stream.Set(kRegCameraConfig3, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetContrast() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig3);
            if (err) return err;

            return camera_reg_value & 0x07
        }

        CameraSetSaturation(level: sentry_camera_config_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig4);
            if (err) return err;

            let glevel = camera_reg_value & 0x0f
            if (level != glevel) {
                camera_reg_value &= 0xf0
                camera_reg_value |= level & 0x0f
                err = this._stream.Set(kRegCameraConfig4, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetSaturation() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig4);
            if (err) return err;

            return camera_reg_value & 0x0f
        }

        CameraSetShaprness(level: sentry_camera_config_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig5);
            if (err) return err;

            let glevel = camera_reg_value & 0x0f
            if (level != glevel) {
                camera_reg_value &= 0xf0
                camera_reg_value |= level & 0x0f
                err = this._stream.Set(kRegCameraConfig5, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetShaprness() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig5);
            if (err) return err;

            return camera_reg_value & 0x0f
        }
    }

    let pSentry: any[] = [null, null, null, null]

    /**
     * Begin Sentry.
     */
    //% blockId=Sentry_begin block="initialize%id|mode%mode"
    //% group="Settings"
    export function Begin(id: SentryId, mode: sentry_mode_e) {
        if (pSentry[id] == null) {
            pSentry[id] = new SentryMethod(id + 0x60)
            while (pSentry[id].Begin(mode) != SENTRY_OK);
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
    //% blockId=Sentry_vision_begin block="%id|%enable|algorithm%vision_type"
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
    //% blockId=Sentry_led_set_color block="%id|LED when detected %detected_color|when undetected %undetected_color|level %level"
    //% level.min=0 level.max=15 level.defl=1
    //% weight=200 inlineInputMode=inline
    //% group="Settings" advanced=true
    export function LedSetColor(id: SentryId, detected_color: sentry_led_color_e, undetected_color: sentry_led_color_e, level: number) {
        while (pSentry[id].LedSetColor(detected_color, undetected_color, level) != SENTRY_OK);
    }

    /**
     * set LCD config.
     * @param id Sentry id
     * @param config value.
     */
    //% blockId=Sentry_set_lcd block="%id|LCD show %on"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="Settings" advanced=true
    export function LcdSetMode(id: SentryId, on: boolean) {
        while (pSentry[id].LcdSetMode(on) != SENTRY_OK);
    }

    /**
     * set camera zoom.
     * @param id Sentry id
     * @param zoom zoom value.
     */
    //% blockId=Sentry_camera_set_zoom block="%id|digital zoom%zoom"
    //% group="CcameraSettings" advanced=true
    export function CameraSetZoom(id: SentryId, zoom: sentry_camera_zoom_e) {
        while (pSentry[id].CameraSetZoom(zoom) != SENTRY_OK);
    }

    /**
     * set camera zoom.
     * @param id Sentry id
     * @param rotate value.
     */
    //% blockId=Sentry_camera_set_rotate block="%id| rotate 180°%on"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="CcameraSettings" advanced=true
    export function CameraSetRotate(id: SentryId, on: boolean) {
        while (pSentry[id].CameraSetRotate(on) != SENTRY_OK);
    }

    /**
    * set camera white balance.
    * @param id Sentry id
    * @param wb white balance type.
    */
    //% blockId=Sentry_camera_set_awb block="%id|white balance%wb"
    //% group="CcameraSettings" advanced=true
    export function CameraSetAwb(id: SentryId, wb: sentry_camera_white_balance_e) {
        while (pSentry[id].CameraSetAwb(wb) != SENTRY_OK);
    }

    /**
     * set camera FPS.
     * @param id Sentry id
     * @param on FPS type.
     */
    //% blockId=Sentry_camera_set_fps block="%id|high FPS mode$on"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="CcameraSettings" advanced=true
    export function CameraSetFPS(id: SentryId, on: boolean) {
        while (pSentry[id].CameraSetFPS(on) != SENTRY_OK);
    }

    /**
     * set camera brightness.
     * @param id Sentry id
     * @param brightness level value.
     */
    //% blockId=Sentry_camera_set_brightness block="%id|brightness level%level"
    //% group="CcameraSettings" advanced=true
    export function CameraSetBrightness(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetBrightness(level) != SENTRY_OK);
    }

    /**
     * set camera contrast.
     * @param id Sentry id
     * @param contrast level value.
     */
    //% blockId=Sentry_camera_set_contrast block="%id|contrast level%level"
    //% group="CcameraSettings" advanced=true
    export function CameraSetContrast(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetContrast(level) != SENTRY_OK);
    }

    /**
     * set camera saturation.
     * @param id Sentry id
     * @param saturation level value.
     */
    //% blockId=Sentry_camera_set_saturation block="%id|saturation level%level"
    //% group="CcameraSettings" advanced=true
    export function CameraSetSaturation(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetSaturation(level) != SENTRY_OK);
    }

    /**
     * set camera shaprness.
     * @param id Sentry id
     * @param shaprness level value.
     */
    //% blockId=Sentry_camera_set_shaprness block="%id|shaprness level%level"
    //% group="CcameraSettings" advanced=true
    export function CameraSetShaprness(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetShaprness(level) != SENTRY_OK);
    }

    /**
    * get vision sentry_object_t data, this function will update vision sentry_object_t automatically.
    * @param id Sentry id
    * @param vision_type: vision type.
    * @param object_inf:  object information
    */
    //% blockId=Sentry_get_value block="%id|algorithm%vision_type| %object_inf"
    export function GetValue(id: SentryId, vision_type: sentry_vision_e, object_inf: sentry_obj_info_e):number {
        return <number>pSentry[id].GetValue(id, vision_type, object_inf);
    }

    //% blockId=Sentry_get_img_h block="%id rows"
    export function Rows(id: SentryId) {
        return pSentry[id].img_h;
    }

    //% blockId=Sentry_get_img_w block="%id cols"
    export function Cols(id: SentryId) {
        return pSentry[id].img_w;
    }
}
