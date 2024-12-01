// Copyright 2021 Tosee Intelligence (hangzhoou) co.,ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef SENTRY_STREAM_H
#define SENTRY_STREAM_H

#define SENTRY_MICRO_BIT 1

#include "sentry_type.h"
#include "debug/debug_tool.h"

typedef struct
{
    sentry_err_t (*Get)(uint8_t address, const uint8_t reg_address, uint8_t *value);
    sentry_err_t (*Set)(uint8_t address, const uint8_t reg_address, const uint8_t value);
    sentry_err_t (*SetParam)(uint8_t address, int vision_type, sentry_object_t *param, int param_id);
    sentry_err_t (*Read)(uint8_t address, int vision_type, sentry_vision_state_t *vision_state);
    sentry_err_t (*ReadQrCode)(uint8_t address, int vision_type, sentry_qrcode_state_t *qrcode);
    sentry_err_t (*Write)(uint8_t address, int vision_type, const sentry_vision_state_t *vision_state);
}sentry_stream_base_t;

typedef struct
{
    uint8_t address;
    sentry_stream_base_t base;
}sentry_stream_t;


#define Sentry_Stream_Get(stream_, reg_address, value) stream_.base.Get(stream_.address, reg_address, value)
#define Sentry_Stream_Set(stream_, reg_address, value) stream_.base.Set(stream_.address, reg_address, value)
#define Sentry_Stream_SetParam(stream_, vision_type, param, param_id) stream_.base.SetParam(stream_.address, vision_type, param, param_id)
#define Sentry_Stream_Read(stream_, vision_type, vision_state) stream_.base.Read(stream_.address, vision_type, vision_state)
#define Sentry_Stream_ReadQrCode(stream_, vision_type, qrcode) stream_.base.ReadQrCode(stream_.address, vision_type, qrcode)
#define Sentry_Stream_Write(stream_, vision_type, vision_state) stream_.base.Write(stream_.address, vision_type, vision_state)

#endif

