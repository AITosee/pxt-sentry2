//% color="#ff6600" weight=20 icon="\uf085"
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

    export class sentry_vision_state_t {
        vision_type: sentry_vision_e
        frame: number
        detect: number
        sentry_objects: sentry_object_t[]
        constructor(vision_type: sentry_vision_e) {
            this.vision_type = vision_type;
            this.frame = 0;
            this.detect = 0;
            this.sentry_objects = [];

            for (let i = 0; i < SENTRY_MAX_RESULT; i++) {
                this.sentry_objects[i] = new sentry_object_t();
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

            let ret = pins.i2cWriteBuffer(this._addr, buf);

            //console.log("i2cwrite " + this._addr.toString() + " reg:" + reg.toString() + "\t" + value.toString() + "\n")

            return ret;
        }

        private i2cread(reg: number) {
            pins.i2cWriteNumber(this._addr, reg, NumberFormat.UInt8BE, true);
            let value = pins.i2cReadNumber(this._addr, NumberFormat.UInt8BE);

            //console.log("i2cread " + this._addr.toString() + " reg:" + reg.toString() + "\t" + value.toString() + "\n")

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

            if (vision_state.detect <= 0) {
                return [SENTRY_OK, vision_state];
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

                [err, vision_state.sentry_objects[i].data1] = this.Get_u16(
                    kRegsentry_object_tData1L, kRegsentry_object_tData1H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_objects[i].data2] = this.Get_u16(
                    kRegsentry_object_tData2L, kRegsentry_object_tData2H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_objects[i].data3] = this.Get_u16(
                    kRegsentry_object_tData3L, kRegsentry_object_tData3H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_objects[i].data4] = this.Get_u16(
                    kRegsentry_object_tData4L, kRegsentry_object_tData4H)
                if (err) return [err, vision_state];
                [err, vision_state.sentry_objects[i].data5] = this.Get_u16(
                    kRegsentry_object_tData5L, kRegsentry_object_tData5H)
                if (err) return [err, vision_state];

                if (sentry_vision_e.kVisionQrCode == vision_type) {
                    let bytec = 0;
                    let sentry_object_t_id = 0;
                    let offset = 0;
                    let bytestr: string = "";

                    for (let i = 0; i < vision_state.sentry_objects[0].data5; i++) {
                        sentry_object_t_id = (i / 5 + 2) | 0;
                        offset = i % 5;
                        if (0 == i % 5) {
                            err = this.Set(kRegsentry_object_tId, sentry_object_t_id)
                            if (err) return [err, vision_state];
                        }

                        [err, bytec] = this.Get(kRegsentry_object_tData1L + 2 * offset)
                        if (err) return [err, vision_state];

                        bytestr += String.fromCharCode(bytec)
                    }

                    vision_state.sentry_objects[0].bytestr = bytestr;
                }
            }

            return [SENTRY_OK, vision_state]
        }

        SetParam(vision_id: number, param: sentry_object_t, param_id: number): number {
            let err = SENTRY_OK
            err = this.Set(kRegVisionId, vision_id)
            if (err) return err;

            err = this.Set(kRegParamId, param_id + 1)
            if (err) return err;

            this.Set(kRegParamValue1H, (param.data1 >> 8) & 0xFF)
            this.Set(kRegParamValue1L, param.data1 & 0xFF)
            this.Set(kRegParamValue2H, (param.data2 >> 8) & 0xFF)
            this.Set(kRegParamValue2L, param.data2 & 0xFF)
            this.Set(kRegParamValue3H, (param.data3 >> 8) & 0xFF)
            this.Set(kRegParamValue3L, param.data3 & 0xFF)
            this.Set(kRegParamValue4H, (param.data4 >> 8) & 0xFF)
            this.Set(kRegParamValue4L, param.data4 & 0xFF)
            this.Set(kRegParamValue5H, (param.data5 >> 8) & 0xFF)
            this.Set(kRegParamValue5L, param.data5 & 0xFF)

            return SENTRY_OK;
        }
    }

    class SentryUartMethod {
        _addr: number
        constructor(addr: number) {
            this._addr = addr;
        }

        private get_error_code(code: number) {
            let value = SENTRY_FAIL;

            switch (code) {
                case protocol.SENTRY_PROTOC_OK:
                    value = SENTRY_OK;
                    break;
                case protocol.SENTRY_PROTOC_RESULT_NOT_END:
                    value = SENTRY_OK;
                    break;
                case protocol.SENTRY_PROTOC_TIMEOUT:
                    value = SENTRY_READ_TIMEOUT;
                    break;
                case protocol.SENTRY_PROTOC_CHECK_ERROR:
                    value = SENTRY_CHECK_ERROR;
                    break;
                case protocol.SENTRY_PROTOC_LENGTH_ERROR:
                case protocol.SENTRY_PROTOC_UNSUPPORT_COMMAND:
                case protocol.SENTRY_PROTOC_UNSUPPORT_REG_ADDRESS:
                case protocol.SENTRY_PROTOC_UNSUPPORT_REG_VALUE:
                    value = SENTRY_UNKNOWN_PROTOCOL;
                    break;
                default: break;
            }

            return value;
        }

        Set(reg_address: number, value: number): number {
            let pkg: number[] = [this._addr, protocol.SENTRY_PROTOC_COMMADN_SET, reg_address, value];

            let err = protocol.writepkg(pkg);
            if (!err) {
                return SENTRY_FAIL;
            }

            pkg = protocol.readpkg();
            return this.get_error_code(pkg[3]);

        }

        Get(reg_address: number): [number, number] {
            let pkg: number[] = [this._addr, protocol.SENTRY_PROTOC_COMMADN_GET, reg_address];

            let err = protocol.writepkg(pkg);
            let value = 0;
            if (!err) {
                return [SENTRY_FAIL, value];
            }

            pkg = protocol.readpkg();
            value = this.get_error_code(pkg[3]);

            return [value, pkg[5]];
        }

        Read(vision_type: sentry_vision_e, vision_state: sentry_vision_state_t): [number, sentry_vision_state_t] {
            let pkg: number[] = [this._addr, protocol.SENTRY_PROTOC_GET_RESULT, vision_type, 0, 0];
            let err = protocol.writepkg(pkg);
            let value = 0;
            vision_state.detect = 0;

            if (!err) {
                return [SENTRY_FAIL, vision_state];
            }

            for (; ;) {
                pkg = protocol.readpkg();

                value = this.get_error_code(pkg[3]);

                if (SENTRY_OK == value && pkg[4] == protocol.SENTRY_PROTOC_GET_RESULT) {
                    if (vision_type == pkg[6]) {
                        vision_state.frame = pkg[5];
                        let start_id = pkg[7];
                        let stop_id = pkg[8];
                        if (stop_id == 0) return [SENTRY_OK, vision_state];

                        for (let i = start_id - 1, j = 0; i < stop_id; i++, j++) {
                            vision_state.sentry_objects[i].data1 = pkg[10 * j + 9] << 8 | pkg[10 * j + 10];
                            vision_state.sentry_objects[i].data2 = pkg[10 * j + 11] << 8 | pkg[10 * j + 12];
                            vision_state.sentry_objects[i].data3 = pkg[10 * j + 13] << 8 | pkg[10 * j + 14];
                            vision_state.sentry_objects[i].data4 = pkg[10 * j + 15] << 8 | pkg[10 * j + 16];
                            vision_state.sentry_objects[i].data5 = pkg[10 * j + 17] << 8 | pkg[10 * j + 18];
                            vision_state.detect++;

                            if (sentry_vision_e.kVisionQrCode == vision_type) {
                                let bytec = 0;
                                let bytestr: string = "";

                                for (let i = 0; i < vision_state.sentry_objects[0].data5; i++) {
                                    bytec = pkg[20 + 2 * i];
                                    bytestr += String.fromCharCode(bytec)
                                }

                                vision_state.sentry_objects[0].bytestr = bytestr;
                            }
                        }

                        if (pkg[3] == protocol.SENTRY_PROTOC_RESULT_NOT_END) {
                            continue;
                        } else {
                            serial.writeBuffer(pins.createBufferFromArray(pkg));
                            return [SENTRY_OK, vision_state]
                        }
                    }

                }

                return [SENTRY_FAIL, vision_state];
            }
        }

        SetParam(vision_id: number, param: sentry_object_t, param_id: number): number {
            let pkg: number[] = [this._addr, protocol.SENTRY_PROTOC_SET_PARAM, vision_id, param_id + 1, param_id + 1];

            pkg.push((param.data1 >> 8) & 0xFF); pkg.push(param.data1 & 0xff);
            pkg.push((param.data1 >> 8) & 0xFF); pkg.push(param.data1 & 0xff);
            pkg.push((param.data1 >> 8) & 0xFF); pkg.push(param.data1 & 0xff);
            pkg.push((param.data1 >> 8) & 0xFF); pkg.push(param.data1 & 0xff);
            pkg.push((param.data1 >> 8) & 0xFF); pkg.push(param.data1 & 0xff);

            let err = protocol.writepkg(pkg);
            if (!err) {
                return SENTRY_FAIL;
            }

            pkg = protocol.readpkg();
            return this.get_error_code(pkg[3]);
        }
    }

    class SentryMethod {
        _address: number;
        _stream: SentryI2CMethod | SentryUartMethod;
        _mode: sentry_mode_e;
        _vision_states: sentry_vision_state_t[];

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
                    this._stream = new SentryUartMethod(this._address);
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

                [err, start_up] = this._stream.Get(kRegSensorConfig1);
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
                [err, device_id] = this._stream.Get(kRegDeviceId);

                if (device_id == SENTRY_DEVICE_ID) break;
            }
            return err;
        }

        SensorSetDefault() {
            let [err, sensor_config_reg_value] = this._stream.Get(kRegSensorConfig1);

            sensor_config_reg_value |= 0x08;
            err = this._stream.Set(kRegSensorConfig1, sensor_config_reg_value);
            while (true) {
                [err, sensor_config_reg_value] = this._stream.Get(kRegSensorConfig1);
                if (err) return err;

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

            [err, tmp[0]] = this._stream.Get(kRegFrameWidthL);
            [err, tmp[1]] = this._stream.Get(kRegFrameWidthH);
            if (err) return err;

            this.img_w = tmp[1] << 8 | tmp[0];

            [err, tmp[0]] = this._stream.Get(kRegFrameHeightL);
            [err, tmp[1]] = this._stream.Get(kRegFrameHeightH);
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

            if (enable && this._vision_states[vision_type - 1] == null) {
                this._vision_states[vision_type - 1] = new sentry_vision_state_t(vision_type);
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

        GetValue(vision_type: sentry_vision_e, obj_info: sentry_obj_info_e, obj_id: number = 0) {

            if (obj_info == sentry_obj_info_e.kStatus) {
                while (this.UpdateResult(vision_type));
            }

            return this.read(vision_type, obj_info, obj_id)
        }

        GetQrCodeValue(): string {

            if (this._vision_states[sentry_vision_e.kVisionQrCode - 1] == null) return "";

            let vision_state = <sentry_vision_state_t>this._vision_states[sentry_vision_e.kVisionQrCode - 1];

            return vision_state.sentry_objects[0].bytestr;
        }

        SetParamNum(vision_type: sentry_vision_e, max_num: number) {
            let err = SENTRY_OK;

            err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            err = this._stream.Set(kRegParamNum, max_num);

            return err;
        }

        SetParam(vision_type: sentry_vision_e, param: sentry_object_t, param_id: number = 0) {
            return this._stream.SetParam(vision_type, param, param_id)
        }

        _SensorLockkReg(lock: SentryStatus) {
            let err = SENTRY_OK;
            let status = 0;

            for (; ;) {
                [err, status] = this._stream.Get(kRegLock);
                if (err) return err;
                if (status == lock) {
                    return SENTRY_OK;
                }
                err = this._stream.Set(kRegLock, lock);
                if (err) return err;
            }
        }

        UpdateResult(vision_type: sentry_vision_e) {
            if (vision_type >= sentry_vision_e.kVisionMaxType)
                return 0;

            let vision_state = <sentry_vision_state_t>this._vision_states[vision_type - 1];

            let [err, frame] = this._stream.Get(kRegFrameCount);
            if (err) return err;

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Disable));

            if (frame == vision_state.frame)
                return SENTRY_FAIL;

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Enable));

            [err, vision_state] = this._stream.Read(vision_type, vision_state);

            if (!err)
                this._vision_states[vision_type - 1] = vision_state;

            while (SENTRY_OK != this._SensorLockkReg(SentryStatus.Disable));

            return err;
        }

        private read(vision_type: sentry_vision_e, obj_info: sentry_obj_info_e, obj_id: number = 0) {
            let vision_pointer = vision_type - 1;

            if (obj_id >= SENTRY_MAX_RESULT) obj_id = SENTRY_MAX_RESULT - 1;

            if (null == this._vision_states[vision_pointer] || vision_pointer >= sentry_vision_e.kVisionMaxType)
                return 0;

            let vision_state = this._vision_states[vision_pointer];

            switch (obj_info) {
                case sentry_obj_info_e.kStatus:
                    return vision_state.detect;
                case sentry_obj_info_e.kXValue:
                    return vision_state.sentry_objects[obj_id].data1 * 100 / this.img_w | 0;
                case sentry_obj_info_e.kYValue:
                    return vision_state.sentry_objects[obj_id].data2 * 100 / this.img_h | 0;
                case sentry_obj_info_e.kWidthValue:
                    return vision_state.sentry_objects[obj_id].data3 * 100 / this.img_w | 0;
                case sentry_obj_info_e.kHeightValue:
                    return vision_state.sentry_objects[obj_id].data4 * 100 / this.img_h | 0;
                case sentry_obj_info_e.kLabel:
                    return vision_state.sentry_objects[obj_id].data5;
                case sentry_obj_info_e.kGValue:
                    return vision_state.sentry_objects[obj_id].data1;
                case sentry_obj_info_e.kRValue:
                    return vision_state.sentry_objects[obj_id].data2;
                case sentry_obj_info_e.kBValue:
                    return vision_state.sentry_objects[obj_id].data3;
                default:
                    return 0;
            }
        }

        VisionSetDefault(vision_type: sentry_vision_e) {
            let err = this._stream.Set(kRegVisionId, vision_type);
            if (err) return err;

            return SENTRY_OK;
        }

        LedSetMode(manual: SentryStatus, hold: SentryStatus) {
            let err = SENTRY_OK;
            let led_reg_value = 0;

            [err, led_reg_value] = this._stream.Get(kRegLed)
            if (err) return err;

            let gmanual = led_reg_value & 0x01
            let ghold = (led_reg_value >> 4) & 0x01

            if (manual != gmanual || hold != ghold) {
                led_reg_value &= 0xfe
                led_reg_value |= manual & 0x01

                led_reg_value &= 0xef
                led_reg_value |= (hold & 0x01) << 4

                err = this._stream.Set(kRegLed, led_reg_value)
                if (err) return err;
            }

            return SENTRY_OK
        }

        LedSetColor(detected_color: sentry_led_color_e, undetected_color: sentry_led_color_e, level: number = 1) {
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

        CameraSetZoom(zoom: sentry_camera_zoom_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let gzoom = camera_reg_value & 0x07
            if (zoom != gzoom) {
                camera_reg_value &= 0xf8
                camera_reg_value |= zoom & 0x07
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetZoom() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return camera_reg_value & 0x07
        }

        CameraSetRotate(enable: SentryStatus) {
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

        CameraGetRotate() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return (camera_reg_value >> 3) & 0x01
        }

        CameraSetFPS(fps: sentry_camera_fps_e) {
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

        CameraGetFPS() {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            return (camera_reg_value >> 4) & 0x01
        }

        CameraSetAwb(awb: sentry_camera_white_balance_e) {
            let [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
            if (err) return err;

            let white_balance = (camera_reg_value >> 5) & 0x03
            if (sentry_camera_white_balance_e.kLockWhiteBalance == awb) {
                camera_reg_value &= 0x1f
                camera_reg_value |= (awb & 0x03) << 5
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
                while ((camera_reg_value >> 7) == 0) {
                    [err, camera_reg_value] = this._stream.Get(kRegCameraConfig1);
                    if (err) return err;
                }
            }
            else if (white_balance != awb) {
                camera_reg_value &= 0x1f
                camera_reg_value |= (awb & 0x03) << 5
                err = this._stream.Set(kRegCameraConfig1, camera_reg_value);
                if (err) return err;
            }

            return SENTRY_OK;
        }

        CameraGetAwb() {
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
                camera_reg_value |= (level & 0xf0) << 4
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

    let pSentry: SentryMethod[] = [null, null, null, null]

    /**
     * Begin Sentry.
     */
    //% blockId=Sentry_begin block="initialize%id|mode%mode "
    //% mode.defl=sentry_mode_e.kI2CMode
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
    //% blockId=Sentry_set_default block="restore %id| default settings "
    //% group="Settings"
    export function SetDefault(id: SentryId) {
        while (pSentry[id].SensorSetDefault() != SENTRY_OK);
    }

    /**
     * Sentry vision Set.
    */
    //% blockId=Sentry_vision_Set block="set %id|%enable|algorithm%vision_type "
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
    //% blockId=Sentry_led_set_color block="set %id|LED when detected %detected_color|when undetected %undetected_color||level %level "
    //% detected_color.defl=sentry_led_color_e.kLedBlue
    //% undetected_color.defl=sentry_led_color_e.kLedGreen
    //% level.min=0 level.max=15 level.defl=1
    //% inlineInputMode=inline
    //% expandableArgumentMode="enabled"
    //% group="Settings" advanced=true 
    export function LedSetColor(id: SentryId, detected_color: sentry_led_color_e, undetected_color: sentry_led_color_e, level: number = 1) {
        while (pSentry[id].LedSetColor(detected_color, undetected_color, level) != SENTRY_OK);
    }

    /**
     * set LCD config.
     * @param id Sentry id
     * @param config value.
     */
    //% blockId=Sentry_set_lcd block="set %id|LCD show %on "
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="Settings" advanced=true
    export function LcdSetMode(id: SentryId, on: boolean) {
        let value = on ? SentryStatus.Enable : SentryStatus.Disable;
        while (pSentry[id].LcdSetMode(value) != SENTRY_OK);
    }

    /**
     * set camera zoom.
     * @param id Sentry id
     * @param zoom zoom value.
     */
    //% blockId=Sentry_camera_set_zoom block="set %id|camera digital zoom%zoom " color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetZoom(id: SentryId, zoom: sentry_camera_zoom_e) {
        while (pSentry[id].CameraSetZoom(zoom) != SENTRY_OK);
    }

    /**
     * set camera zoom.
     * @param id Sentry id
     * @param rotate value.
     */
    //% blockId=Sentry_camera_set_rotate block="set %id|camera  rotate 180°%on " color="#1098C9"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="CameraSettings" advanced=true
    export function CameraSetRotate(id: SentryId, on: boolean) {
        let value = on ? SentryStatus.Enable : SentryStatus.Disable;
        while (pSentry[id].CameraSetRotate(value) != SENTRY_OK);
    }

    /**
    * set camera white balance.
    * @param id Sentry id
    * @param wb white balance type.
    */
    //% blockId=Sentry_camera_set_awb block="set %id|camera white balance%wb " color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetAwb(id: SentryId, wb: sentry_camera_white_balance_e) {
        while (pSentry[id].CameraSetAwb(wb) != SENTRY_OK);
    }

    /**
     * set camera FPS.
     * @param id Sentry id
     * @param on FPS type.
     */
    //% blockId=Sentry_camera_set_fps block="set %id|camera high FPS mode$on " color="#1098C9"
    //% on.shadow="toggleOnOff" on.defl="true"
    //% group="CameraSettings" advanced=true
    export function CameraSetFPS(id: SentryId, on: boolean) {
        let fps = on ? sentry_camera_fps_e.kFPSHigh : sentry_camera_fps_e.kFPSNormal;
        while (pSentry[id].CameraSetFPS(fps) != SENTRY_OK);
    }

    /**
     * set camera brightness.
     * @param id Sentry id
     * @param brightness level value.
     */
    //% blockId=Sentry_camera_set_brightness block="set %id|camera brightness %level " color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetBrightness(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetBrightness(level) != SENTRY_OK);
    }

    /**
     * set camera contrast.
     * @param id Sentry id
     * @param contrast level value.
     */
    //% blockId=Sentry_camera_set_contrast block="set %id|camera contrast %level " color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetContrast(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetContrast(level) != SENTRY_OK);
    }

    /**
     * set camera saturation.
     * @param id Sentry id
     * @param saturation level value.
     */
    //% blockId=Sentry_camera_set_saturation block="set %id|camera saturation %level " color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetSaturation(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetSaturation(level) != SENTRY_OK);
    }

    /**
     * set camera shaprness.
     * @param id Sentry id
     * @param shaprness level value.
     */
    //% blockId=Sentry_camera_set_shaprness block="set %id|camera shaprness %level "  color="#1098C9"
    //% group="CameraSettings" advanced=true
    export function CameraSetShaprness(id: SentryId, level: sentry_camera_config_e) {
        while (pSentry[id].CameraSetShaprness(level) != SENTRY_OK);
    }

    /**
     * Get vision status
     * @param SentryId id
     * @param type vision type
     */
    //% blockId=Sentry_detected block="%id| algorithm %vision_type detected number " color="#2E8B57"
    //% group="Functions"
    export function Detected(id: SentryId, vision_type: sentry_vision_e): number {
        return pSentry[id].GetValue(vision_type, sentry_obj_info_e.kStatus)
    }

    /**
    * get vision sentry_object_t data, this function will update vision sentry_object_t automatically.
    * @param id Sentry id
    * @param vision_type: vision type.
    * @param object_inf:  object information
    */
    //% blockId=Sentry_get_value block="%id| algorithm%vision_type| Recognition%object_inf|| index %obj_id " color="#2E8B57"
    //% inlineInputMode=inline
    //% expandableArgumentMode="enabled"
    //% obj_id.defl=0
    //% group="Functions"
    export function GetValue(id: SentryId, vision_type: sentry_vision_value, object_info: sentry_gen_info_e, obj_id: number): number {
        return <number>pSentry[id].GetValue(<number>vision_type, <number>object_info, obj_id);
    }

    /**
     * Get the result of vision color recognition.
     * @param SentryId id
     * @param obj_info Paramters type
     */
    //% blockId=Sentry_get_color_value block="%id| algorithm Color| Recognition%obj_info|| index %obj_id " color="#2E8B57"
    //% inlineInputMode=inline
    //% expandableArgumentMode="enabled"
    //% obj_id.defl=0
    //% group="Functions"
    export function ColorRcgValue(id: SentryId, obj_info: sentry_color_info_e, obj_id: number): number {
        return pSentry[id].GetValue(sentry_vision_e.kVisionColor, <number>obj_info, obj_id)
    }

    /**
     * Get the result of vision color recognition.
     * @param SentryId id
     * @param obj_info Paramters type
     */
    //% blockId=Sentry_get_qrRcg_value  block="%id|QrCode Recognition|%obj_info " color="#2E8B57"
    //% group="Functions"
    export function QrRcgValue(id: SentryId, obj_info: sentry_qr_info_e): number {
        return pSentry[id].GetValue(sentry_vision_e.kVisionQrCode, <number>obj_info, 0)
    }

    /**
     * Get the result of vision QrCode value
     * @param SentryId id
     */
    //% blockId=Sentry_get_qr_value block="%id|QrCode value " color="#2E8B57"
    //% group="Functions"
    export function GetQrCodeValue(id: SentryId): string {
        return <string>pSentry[id].GetQrCodeValue()
    }

    //% blockId=Sentry_get_img_h block="%id image weight " color="#2E8B57"
    //% group="Functions"
    export function Rows(id: SentryId) {
        return pSentry[id].img_h;
    }

    //% blockId=Sentry_get_img_w block="%id image height " color="#2E8B57"
    //% group="Functions"
    export function Cols(id: SentryId) {
        return pSentry[id].img_w;
    }
}

namespace protocol {
    /* Protocol Error Type */
    export const SENTRY_PROTOC_OK = 0xE0
    export const SENTRY_PROTOC_FAIL = 0xE1
    export const SENTRY_PROTOC_UNKNOWN = 0xE2
    export const SENTRY_PROTOC_TIMEOUT = 0xE3
    export const SENTRY_PROTOC_CHECK_ERROR = 0xE4
    export const SENTRY_PROTOC_LENGTH_ERROR = 0xE5
    export const SENTRY_PROTOC_UNSUPPORT_COMMAND = 0xE6
    export const SENTRY_PROTOC_UNSUPPORT_REG_ADDRESS = 0xE7
    export const SENTRY_PROTOC_UNSUPPORT_REG_VALUE = 0xE8
    export const SENTRY_PROTOC_READ_ONLY = 0xE9
    export const SENTRY_PROTOC_RESTART_ERROR = 0xEA
    export const SENTRY_PROTOC_RESULT_NOT_END = 0xEC

    /* Protocol */
    export const SENTRY_PROTOC_START = 0xFF
    export const SENTRY_PROTOC_END = 0xED
    export const SENTRY_PROTOC_COMMADN_SET = 0x01
    export const SENTRY_PROTOC_COMMADN_GET = 0x02
    export const SENTRY_PROTOC_SET_PARAM = 0x21
    export const SENTRY_PROTOC_GET_RESULT = 0x23
    export const SENTRY_PROTOC_MESSAGE = 0x11

    let readbuff: Buffer = pins.createBuffer(0);
    //% block
    //% blockHidden=true
    export function readpkg(timeout: number = 1000): number[] {
        let protocol_buf: number[] = [];
        let start_receive = false;
        let timeout_t = timeout;

        serial.setRxBufferSize(255);
        for (; ;) {
            if (readbuff.length < 1) {
                readbuff = serial.readBuffer(0);
            }

            if (readbuff.length > 0) {

                for (let index = 0; index < readbuff.length; ++index) {
                    let value = readbuff.getUint8(index)
                    switch (value) {
                        case SENTRY_PROTOC_START:
                            start_receive = true;
                            break;
                        case SENTRY_PROTOC_END:

                            if (start_receive && (protocol_buf.length + 1) == protocol_buf[1]) {
                                value = protocol_buf[0];

                                for (let i = 1; i < protocol_buf.length - 1; ++i) {
                                    value += protocol_buf[i];
                                }

                                value &= 0xff;
                                if (protocol_buf[protocol_buf.length - 1] != value) {
                                    protocol_buf[2] = SENTRY_PROTOC_CHECK_ERROR;
                                }

                                if (readbuff.length - index > 1) {
                                    readbuff = readbuff.slice(index, readbuff.length - index);
                                } else {
                                    readbuff = pins.createBuffer(0);
                                }

                                return protocol_buf;
                            }
                            break;
                        default: break;
                    }

                    if (start_receive) {
                        protocol_buf.push(value);
                    }
                }

                timeout_t = timeout;
                if (readbuff.length) {
                    readbuff = pins.createBuffer(0);
                }

            }
            else {
                basic.pause(5);
                timeout_t -= 5;
            }

            if (timeout_t < 0) {
                return [0, 0, 0, SENTRY_PROTOC_TIMEOUT, 0, 0];
            }
        }
    }

    //% block
    //% blockHidden=true
    export function writepkg(pkg: number[]): boolean {
        if (pkg.length > 0) {
            let protocol_buf: number[] = [SENTRY_PROTOC_START, 4];
            protocol_buf[1] += pkg.length;

            let value = SENTRY_PROTOC_START + protocol_buf[1];

            for (let index = 0; index < pkg.length; ++index) {
                value += pkg[index];
                protocol_buf.push(pkg[index]);
            }

            value &= 0xff;
            protocol_buf.push(value);
            protocol_buf.push(SENTRY_PROTOC_END);

            let buff = pins.createBufferFromArray(protocol_buf)

            serial.writeBuffer(buff);
            return true;
        } else {
            return false;
        }
    }
}
