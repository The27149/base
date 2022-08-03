declare namespace protoCommon {
/** cmd enum. */
export enum cmd {
    msg_base = 0,
    msg_login = 1,
    msg_user = 10,
    msg_error_code = 11,
    msg_broadcast = 12,
    msg_room = 13,
    msg_gm = 14,
    msg_active = 15,
    msg_chat = 16
}

/** active_cmd enum. */
export enum active_cmd {
    activesInfoPush = 1,
    activeBaseReq = 2,
    activeBaseResp = 3,
    activeRankReq = 4,
    activeRankResp = 5,
    activeOperateReq = 6,
    activeOperateResp = 7,
    activeRankRewardsPush = 8,
    activeKongTouRewardPush = 9
}

/** Represents a msg_active_service */
export class msg_active_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_active_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_active_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_active_service;
}

/** Represents an activesInfoPush. */
export class activesInfoPush implements IactivesInfoPush {

    /**
     * Constructs a new activesInfoPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactivesInfoPush);

    /** activesInfoPush activeInfos. */
    public activeInfos: Iactive_info_type[];

    /** activesInfoPush enterStart. */
    public enterStart: (number|Long);

    /** activesInfoPush enterEnd. */
    public enterEnd: (number|Long);

    /**
     * Creates a new activesInfoPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activesInfoPush instance
     */
    public static create(properties?: IactivesInfoPush): activesInfoPush;

    /**
     * Encodes the specified activesInfoPush message. Does not implicitly {@link activesInfoPush.verify|verify} messages.
     * @param message activesInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactivesInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activesInfoPush message, length delimited. Does not implicitly {@link activesInfoPush.verify|verify} messages.
     * @param message activesInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactivesInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activesInfoPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activesInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activesInfoPush;

    /**
     * Decodes an activesInfoPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activesInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activesInfoPush;

    /**
     * Verifies an activesInfoPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activesInfoPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activesInfoPush
     */
    public static fromObject(object: { [k: string]: any }): activesInfoPush;

    /**
     * Creates a plain object from an activesInfoPush message. Also converts values to other types if specified.
     * @param message activesInfoPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activesInfoPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activesInfoPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeBaseReq. */
export class activeBaseReq implements IactiveBaseReq {

    /**
     * Constructs a new activeBaseReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveBaseReq);

    /** activeBaseReq actType. */
    public actType: active_type;

    /** activeBaseReq actId. */
    public actId: string;

    /**
     * Creates a new activeBaseReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeBaseReq instance
     */
    public static create(properties?: IactiveBaseReq): activeBaseReq;

    /**
     * Encodes the specified activeBaseReq message. Does not implicitly {@link activeBaseReq.verify|verify} messages.
     * @param message activeBaseReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveBaseReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeBaseReq message, length delimited. Does not implicitly {@link activeBaseReq.verify|verify} messages.
     * @param message activeBaseReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveBaseReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeBaseReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeBaseReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeBaseReq;

    /**
     * Decodes an activeBaseReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeBaseReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeBaseReq;

    /**
     * Verifies an activeBaseReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeBaseReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeBaseReq
     */
    public static fromObject(object: { [k: string]: any }): activeBaseReq;

    /**
     * Creates a plain object from an activeBaseReq message. Also converts values to other types if specified.
     * @param message activeBaseReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeBaseReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeBaseReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeBaseResp. */
export class activeBaseResp implements IactiveBaseResp {

    /**
     * Constructs a new activeBaseResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveBaseResp);

    /** activeBaseResp actType. */
    public actType: active_type;

    /** activeBaseResp actId. */
    public actId: string;

    /** activeBaseResp info. */
    public info?: (Iact_base_type|null);

    /** activeBaseResp actCurScore. */
    public actCurScore: (number|Long);

    /** activeBaseResp actScore. */
    public actScore: (number|Long);

    /** activeBaseResp exchangeJifen. */
    public exchangeJifen: (number|Long)[];

    /** activeBaseResp minCost. */
    public minCost: (number|Long)[];

    /**
     * Creates a new activeBaseResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeBaseResp instance
     */
    public static create(properties?: IactiveBaseResp): activeBaseResp;

    /**
     * Encodes the specified activeBaseResp message. Does not implicitly {@link activeBaseResp.verify|verify} messages.
     * @param message activeBaseResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveBaseResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeBaseResp message, length delimited. Does not implicitly {@link activeBaseResp.verify|verify} messages.
     * @param message activeBaseResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveBaseResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeBaseResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeBaseResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeBaseResp;

    /**
     * Decodes an activeBaseResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeBaseResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeBaseResp;

    /**
     * Verifies an activeBaseResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeBaseResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeBaseResp
     */
    public static fromObject(object: { [k: string]: any }): activeBaseResp;

    /**
     * Creates a plain object from an activeBaseResp message. Also converts values to other types if specified.
     * @param message activeBaseResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeBaseResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeBaseResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeRankReq. */
export class activeRankReq implements IactiveRankReq {

    /**
     * Constructs a new activeRankReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveRankReq);

    /** activeRankReq actType. */
    public actType: active_type;

    /** activeRankReq actId. */
    public actId: string;

    /** activeRankReq rankType. */
    public rankType: act_rank_type;

    /** activeRankReq page. */
    public page: number;

    /** activeRankReq pageLen. */
    public pageLen: number;

    /**
     * Creates a new activeRankReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeRankReq instance
     */
    public static create(properties?: IactiveRankReq): activeRankReq;

    /**
     * Encodes the specified activeRankReq message. Does not implicitly {@link activeRankReq.verify|verify} messages.
     * @param message activeRankReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveRankReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeRankReq message, length delimited. Does not implicitly {@link activeRankReq.verify|verify} messages.
     * @param message activeRankReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveRankReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeRankReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeRankReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeRankReq;

    /**
     * Decodes an activeRankReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeRankReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeRankReq;

    /**
     * Verifies an activeRankReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeRankReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeRankReq
     */
    public static fromObject(object: { [k: string]: any }): activeRankReq;

    /**
     * Creates a plain object from an activeRankReq message. Also converts values to other types if specified.
     * @param message activeRankReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeRankReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeRankReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeRankResp. */
export class activeRankResp implements IactiveRankResp {

    /**
     * Constructs a new activeRankResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveRankResp);

    /** activeRankResp actType. */
    public actType: active_type;

    /** activeRankResp actId. */
    public actId: string;

    /** activeRankResp rankType. */
    public rankType: act_rank_type;

    /** activeRankResp rankRewards. */
    public rankRewards: Iactive_rank_rewards[];

    /** activeRankResp selfRank. */
    public selfRank: Iactive_rank_rewards;

    /** activeRankResp page. */
    public page: number;

    /** activeRankResp totalPage. */
    public totalPage: number;

    /** activeRankResp totalLen. */
    public totalLen: number;

    /**
     * Creates a new activeRankResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeRankResp instance
     */
    public static create(properties?: IactiveRankResp): activeRankResp;

    /**
     * Encodes the specified activeRankResp message. Does not implicitly {@link activeRankResp.verify|verify} messages.
     * @param message activeRankResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveRankResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeRankResp message, length delimited. Does not implicitly {@link activeRankResp.verify|verify} messages.
     * @param message activeRankResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveRankResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeRankResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeRankResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeRankResp;

    /**
     * Decodes an activeRankResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeRankResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeRankResp;

    /**
     * Verifies an activeRankResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeRankResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeRankResp
     */
    public static fromObject(object: { [k: string]: any }): activeRankResp;

    /**
     * Creates a plain object from an activeRankResp message. Also converts values to other types if specified.
     * @param message activeRankResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeRankResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeRankResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeOperateReq. */
export class activeOperateReq implements IactiveOperateReq {

    /**
     * Constructs a new activeOperateReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveOperateReq);

    /** activeOperateReq actType. */
    public actType: active_type;

    /** activeOperateReq actId. */
    public actId: string;

    /** activeOperateReq type. */
    public type: act_operate_type;

    /** activeOperateReq lottery. */
    public lottery: act_lottery_type;

    /** activeOperateReq exchange. */
    public exchange?: (Iact_exchange_type|null);

    /** activeOperateReq ririling. */
    public ririling?: (Iact_exchange_type|null);

    /** activeOperateReq actCurScore. */
    public actCurScore: (number|Long);

    /** activeOperateReq actScore. */
    public actScore: (number|Long);

    /**
     * Creates a new activeOperateReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeOperateReq instance
     */
    public static create(properties?: IactiveOperateReq): activeOperateReq;

    /**
     * Encodes the specified activeOperateReq message. Does not implicitly {@link activeOperateReq.verify|verify} messages.
     * @param message activeOperateReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveOperateReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeOperateReq message, length delimited. Does not implicitly {@link activeOperateReq.verify|verify} messages.
     * @param message activeOperateReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveOperateReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeOperateReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeOperateReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeOperateReq;

    /**
     * Decodes an activeOperateReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeOperateReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeOperateReq;

    /**
     * Verifies an activeOperateReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeOperateReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeOperateReq
     */
    public static fromObject(object: { [k: string]: any }): activeOperateReq;

    /**
     * Creates a plain object from an activeOperateReq message. Also converts values to other types if specified.
     * @param message activeOperateReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeOperateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeOperateReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeOperateResp. */
export class activeOperateResp implements IactiveOperateResp {

    /**
     * Constructs a new activeOperateResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveOperateResp);

    /** activeOperateResp actType. */
    public actType: active_type;

    /** activeOperateResp actId. */
    public actId: string;

    /** activeOperateResp type. */
    public type: act_operate_type;

    /** activeOperateResp lottery. */
    public lottery: Iact_lottery_reward_type[];

    /** activeOperateResp exchange. */
    public exchange?: (Iact_exchange_reward_type|null);

    /** activeOperateResp ririling. */
    public ririling?: (Iact_ririling_reward_type|null);

    /** activeOperateResp actCurScore. */
    public actCurScore: (number|Long);

    /** activeOperateResp actScore. */
    public actScore: (number|Long);

    /**
     * Creates a new activeOperateResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeOperateResp instance
     */
    public static create(properties?: IactiveOperateResp): activeOperateResp;

    /**
     * Encodes the specified activeOperateResp message. Does not implicitly {@link activeOperateResp.verify|verify} messages.
     * @param message activeOperateResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveOperateResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeOperateResp message, length delimited. Does not implicitly {@link activeOperateResp.verify|verify} messages.
     * @param message activeOperateResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveOperateResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeOperateResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeOperateResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeOperateResp;

    /**
     * Decodes an activeOperateResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeOperateResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeOperateResp;

    /**
     * Verifies an activeOperateResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeOperateResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeOperateResp
     */
    public static fromObject(object: { [k: string]: any }): activeOperateResp;

    /**
     * Creates a plain object from an activeOperateResp message. Also converts values to other types if specified.
     * @param message activeOperateResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeOperateResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeOperateResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeRankRewardsPush. */
export class activeRankRewardsPush implements IactiveRankRewardsPush {

    /**
     * Constructs a new activeRankRewardsPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveRankRewardsPush);

    /** activeRankRewardsPush actType. */
    public actType: active_type;

    /** activeRankRewardsPush actId. */
    public actId: string;

    /** activeRankRewardsPush rankType. */
    public rankType: act_rank_type;

    /** activeRankRewardsPush rewards. */
    public rewards: Iactive_item_type;

    /** activeRankRewardsPush rank. */
    public rank: number;

    /**
     * Creates a new activeRankRewardsPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeRankRewardsPush instance
     */
    public static create(properties?: IactiveRankRewardsPush): activeRankRewardsPush;

    /**
     * Encodes the specified activeRankRewardsPush message. Does not implicitly {@link activeRankRewardsPush.verify|verify} messages.
     * @param message activeRankRewardsPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveRankRewardsPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeRankRewardsPush message, length delimited. Does not implicitly {@link activeRankRewardsPush.verify|verify} messages.
     * @param message activeRankRewardsPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveRankRewardsPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeRankRewardsPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeRankRewardsPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeRankRewardsPush;

    /**
     * Decodes an activeRankRewardsPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeRankRewardsPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeRankRewardsPush;

    /**
     * Verifies an activeRankRewardsPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeRankRewardsPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeRankRewardsPush
     */
    public static fromObject(object: { [k: string]: any }): activeRankRewardsPush;

    /**
     * Creates a plain object from an activeRankRewardsPush message. Also converts values to other types if specified.
     * @param message activeRankRewardsPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeRankRewardsPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeRankRewardsPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an activeKongTouRewardPush. */
export class activeKongTouRewardPush implements IactiveKongTouRewardPush {

    /**
     * Constructs a new activeKongTouRewardPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IactiveKongTouRewardPush);

    /** activeKongTouRewardPush actType. */
    public actType: active_type;

    /** activeKongTouRewardPush actId. */
    public actId: string;

    /** activeKongTouRewardPush rewards. */
    public rewards: (number|Long);

    /**
     * Creates a new activeKongTouRewardPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns activeKongTouRewardPush instance
     */
    public static create(properties?: IactiveKongTouRewardPush): activeKongTouRewardPush;

    /**
     * Encodes the specified activeKongTouRewardPush message. Does not implicitly {@link activeKongTouRewardPush.verify|verify} messages.
     * @param message activeKongTouRewardPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IactiveKongTouRewardPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified activeKongTouRewardPush message, length delimited. Does not implicitly {@link activeKongTouRewardPush.verify|verify} messages.
     * @param message activeKongTouRewardPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IactiveKongTouRewardPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an activeKongTouRewardPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns activeKongTouRewardPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): activeKongTouRewardPush;

    /**
     * Decodes an activeKongTouRewardPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns activeKongTouRewardPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): activeKongTouRewardPush;

    /**
     * Verifies an activeKongTouRewardPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an activeKongTouRewardPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns activeKongTouRewardPush
     */
    public static fromObject(object: { [k: string]: any }): activeKongTouRewardPush;

    /**
     * Creates a plain object from an activeKongTouRewardPush message. Also converts values to other types if specified.
     * @param message activeKongTouRewardPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: activeKongTouRewardPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this activeKongTouRewardPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an active_info_type. */
export class active_info_type implements Iactive_info_type {

    /**
     * Constructs a new active_info_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iactive_info_type);

    /** active_info_type actType. */
    public actType: active_type;

    /** active_info_type actId. */
    public actId: string;

    /** active_info_type activeShowStart. */
    public activeShowStart: (number|Long);

    /** active_info_type activeStart. */
    public activeStart: (number|Long);

    /** active_info_type activeEnd. */
    public activeEnd: (number|Long);

    /** active_info_type activeShowEnd. */
    public activeShowEnd: (number|Long);

    /**
     * Creates a new active_info_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns active_info_type instance
     */
    public static create(properties?: Iactive_info_type): active_info_type;

    /**
     * Encodes the specified active_info_type message. Does not implicitly {@link active_info_type.verify|verify} messages.
     * @param message active_info_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iactive_info_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified active_info_type message, length delimited. Does not implicitly {@link active_info_type.verify|verify} messages.
     * @param message active_info_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iactive_info_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an active_info_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns active_info_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): active_info_type;

    /**
     * Decodes an active_info_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns active_info_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): active_info_type;

    /**
     * Verifies an active_info_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an active_info_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns active_info_type
     */
    public static fromObject(object: { [k: string]: any }): active_info_type;

    /**
     * Creates a plain object from an active_info_type message. Also converts values to other types if specified.
     * @param message active_info_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: active_info_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this active_info_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_base_type. */
export class act_base_type implements Iact_base_type {

    /**
     * Constructs a new act_base_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_base_type);

    /** act_base_type lotteryBase. */
    public lotteryBase?: (Iact_lottery_base_type|null);

    /** act_base_type exchangeBase. */
    public exchangeBase: Iact_exchange_base_type[];

    /** act_base_type rankType. */
    public rankType: act_rank_type[];

    /** act_base_type hongbaoririlingBase. */
    public hongbaoririlingBase: Iact_hongbaoririling_base_type[];

    /**
     * Creates a new act_base_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_base_type instance
     */
    public static create(properties?: Iact_base_type): act_base_type;

    /**
     * Encodes the specified act_base_type message. Does not implicitly {@link act_base_type.verify|verify} messages.
     * @param message act_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_base_type message, length delimited. Does not implicitly {@link act_base_type.verify|verify} messages.
     * @param message act_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_base_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_base_type;

    /**
     * Decodes an act_base_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_base_type;

    /**
     * Verifies an act_base_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_base_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_base_type
     */
    public static fromObject(object: { [k: string]: any }): act_base_type;

    /**
     * Creates a plain object from an act_base_type message. Also converts values to other types if specified.
     * @param message act_base_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_base_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_base_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_exchange_type. */
export class act_exchange_type implements Iact_exchange_type {

    /**
     * Constructs a new act_exchange_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_exchange_type);

    /** act_exchange_type id. */
    public id: number;

    /** act_exchange_type times. */
    public times: number;

    /**
     * Creates a new act_exchange_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_exchange_type instance
     */
    public static create(properties?: Iact_exchange_type): act_exchange_type;

    /**
     * Encodes the specified act_exchange_type message. Does not implicitly {@link act_exchange_type.verify|verify} messages.
     * @param message act_exchange_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_exchange_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_exchange_type message, length delimited. Does not implicitly {@link act_exchange_type.verify|verify} messages.
     * @param message act_exchange_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_exchange_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_exchange_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_exchange_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_exchange_type;

    /**
     * Decodes an act_exchange_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_exchange_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_exchange_type;

    /**
     * Verifies an act_exchange_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_exchange_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_exchange_type
     */
    public static fromObject(object: { [k: string]: any }): act_exchange_type;

    /**
     * Creates a plain object from an act_exchange_type message. Also converts values to other types if specified.
     * @param message act_exchange_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_exchange_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_exchange_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an active_rank_rewards. */
export class active_rank_rewards implements Iactive_rank_rewards {

    /**
     * Constructs a new active_rank_rewards.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iactive_rank_rewards);

    /** active_rank_rewards rank. */
    public rank: number;

    /** active_rank_rewards userId. */
    public userId: (number|Long);

    /** active_rank_rewards name. */
    public name: string;

    /** active_rank_rewards jifen. */
    public jifen: (number|Long);

    /** active_rank_rewards rewards. */
    public rewards: Iactive_item_type;

    /**
     * Creates a new active_rank_rewards instance using the specified properties.
     * @param [properties] Properties to set
     * @returns active_rank_rewards instance
     */
    public static create(properties?: Iactive_rank_rewards): active_rank_rewards;

    /**
     * Encodes the specified active_rank_rewards message. Does not implicitly {@link active_rank_rewards.verify|verify} messages.
     * @param message active_rank_rewards message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iactive_rank_rewards, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified active_rank_rewards message, length delimited. Does not implicitly {@link active_rank_rewards.verify|verify} messages.
     * @param message active_rank_rewards message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iactive_rank_rewards, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an active_rank_rewards message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns active_rank_rewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): active_rank_rewards;

    /**
     * Decodes an active_rank_rewards message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns active_rank_rewards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): active_rank_rewards;

    /**
     * Verifies an active_rank_rewards message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an active_rank_rewards message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns active_rank_rewards
     */
    public static fromObject(object: { [k: string]: any }): active_rank_rewards;

    /**
     * Creates a plain object from an active_rank_rewards message. Also converts values to other types if specified.
     * @param message active_rank_rewards
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: active_rank_rewards, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this active_rank_rewards to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_lottery_base_type. */
export class act_lottery_base_type implements Iact_lottery_base_type {

    /**
     * Constructs a new act_lottery_base_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_lottery_base_type);

    /** act_lottery_base_type lottery. */
    public lottery: Iact_lottery_reward_type[];

    /** act_lottery_base_type onceCost. */
    public onceCost: (number|Long);

    /** act_lottery_base_type multiCost. */
    public multiCost: (number|Long);

    /**
     * Creates a new act_lottery_base_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_lottery_base_type instance
     */
    public static create(properties?: Iact_lottery_base_type): act_lottery_base_type;

    /**
     * Encodes the specified act_lottery_base_type message. Does not implicitly {@link act_lottery_base_type.verify|verify} messages.
     * @param message act_lottery_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_lottery_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_lottery_base_type message, length delimited. Does not implicitly {@link act_lottery_base_type.verify|verify} messages.
     * @param message act_lottery_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_lottery_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_lottery_base_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_lottery_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_lottery_base_type;

    /**
     * Decodes an act_lottery_base_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_lottery_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_lottery_base_type;

    /**
     * Verifies an act_lottery_base_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_lottery_base_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_lottery_base_type
     */
    public static fromObject(object: { [k: string]: any }): act_lottery_base_type;

    /**
     * Creates a plain object from an act_lottery_base_type message. Also converts values to other types if specified.
     * @param message act_lottery_base_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_lottery_base_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_lottery_base_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_exchange_base_type. */
export class act_exchange_base_type implements Iact_exchange_base_type {

    /**
     * Constructs a new act_exchange_base_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_exchange_base_type);

    /** act_exchange_base_type id. */
    public id: number;

    /** act_exchange_base_type cost. */
    public cost: (number|Long);

    /** act_exchange_base_type rewards. */
    public rewards: Iactive_item_type;

    /** act_exchange_base_type playerLimitTimes. */
    public playerLimitTimes: number;

    /** act_exchange_base_type playerGotTimes. */
    public playerGotTimes: number;

    /** act_exchange_base_type worldLimitTimes. */
    public worldLimitTimes: number;

    /** act_exchange_base_type worldGotTimes. */
    public worldGotTimes: number;

    /**
     * Creates a new act_exchange_base_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_exchange_base_type instance
     */
    public static create(properties?: Iact_exchange_base_type): act_exchange_base_type;

    /**
     * Encodes the specified act_exchange_base_type message. Does not implicitly {@link act_exchange_base_type.verify|verify} messages.
     * @param message act_exchange_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_exchange_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_exchange_base_type message, length delimited. Does not implicitly {@link act_exchange_base_type.verify|verify} messages.
     * @param message act_exchange_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_exchange_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_exchange_base_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_exchange_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_exchange_base_type;

    /**
     * Decodes an act_exchange_base_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_exchange_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_exchange_base_type;

    /**
     * Verifies an act_exchange_base_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_exchange_base_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_exchange_base_type
     */
    public static fromObject(object: { [k: string]: any }): act_exchange_base_type;

    /**
     * Creates a plain object from an act_exchange_base_type message. Also converts values to other types if specified.
     * @param message act_exchange_base_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_exchange_base_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_exchange_base_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_hongbaoririling_base_type. */
export class act_hongbaoririling_base_type implements Iact_hongbaoririling_base_type {

    /**
     * Constructs a new act_hongbaoririling_base_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_hongbaoririling_base_type);

    /** act_hongbaoririling_base_type id. */
    public id: number;

    /** act_hongbaoririling_base_type cost. */
    public cost: (number|Long);

    /** act_hongbaoririling_base_type rewards. */
    public rewards: Iactive_item_type;

    /** act_hongbaoririling_base_type playerLimitTimes. */
    public playerLimitTimes: number;

    /** act_hongbaoririling_base_type playerGotTimes. */
    public playerGotTimes: number;

    /** act_hongbaoririling_base_type worldLimitTimes. */
    public worldLimitTimes: number;

    /** act_hongbaoririling_base_type worldGotTimes. */
    public worldGotTimes: number;

    /** act_hongbaoririling_base_type playActiveScore. */
    public playActiveScore: (number|Long);

    /**
     * Creates a new act_hongbaoririling_base_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_hongbaoririling_base_type instance
     */
    public static create(properties?: Iact_hongbaoririling_base_type): act_hongbaoririling_base_type;

    /**
     * Encodes the specified act_hongbaoririling_base_type message. Does not implicitly {@link act_hongbaoririling_base_type.verify|verify} messages.
     * @param message act_hongbaoririling_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_hongbaoririling_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_hongbaoririling_base_type message, length delimited. Does not implicitly {@link act_hongbaoririling_base_type.verify|verify} messages.
     * @param message act_hongbaoririling_base_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_hongbaoririling_base_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_hongbaoririling_base_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_hongbaoririling_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_hongbaoririling_base_type;

    /**
     * Decodes an act_hongbaoririling_base_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_hongbaoririling_base_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_hongbaoririling_base_type;

    /**
     * Verifies an act_hongbaoririling_base_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_hongbaoririling_base_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_hongbaoririling_base_type
     */
    public static fromObject(object: { [k: string]: any }): act_hongbaoririling_base_type;

    /**
     * Creates a plain object from an act_hongbaoririling_base_type message. Also converts values to other types if specified.
     * @param message act_hongbaoririling_base_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_hongbaoririling_base_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_hongbaoririling_base_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_lottery_reward_type. */
export class act_lottery_reward_type implements Iact_lottery_reward_type {

    /**
     * Constructs a new act_lottery_reward_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_lottery_reward_type);

    /** act_lottery_reward_type id. */
    public id: number;

    /** act_lottery_reward_type rewards. */
    public rewards: Iactive_item_type;

    /**
     * Creates a new act_lottery_reward_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_lottery_reward_type instance
     */
    public static create(properties?: Iact_lottery_reward_type): act_lottery_reward_type;

    /**
     * Encodes the specified act_lottery_reward_type message. Does not implicitly {@link act_lottery_reward_type.verify|verify} messages.
     * @param message act_lottery_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_lottery_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_lottery_reward_type message, length delimited. Does not implicitly {@link act_lottery_reward_type.verify|verify} messages.
     * @param message act_lottery_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_lottery_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_lottery_reward_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_lottery_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_lottery_reward_type;

    /**
     * Decodes an act_lottery_reward_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_lottery_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_lottery_reward_type;

    /**
     * Verifies an act_lottery_reward_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_lottery_reward_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_lottery_reward_type
     */
    public static fromObject(object: { [k: string]: any }): act_lottery_reward_type;

    /**
     * Creates a plain object from an act_lottery_reward_type message. Also converts values to other types if specified.
     * @param message act_lottery_reward_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_lottery_reward_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_lottery_reward_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_exchange_reward_type. */
export class act_exchange_reward_type implements Iact_exchange_reward_type {

    /**
     * Constructs a new act_exchange_reward_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_exchange_reward_type);

    /** act_exchange_reward_type id. */
    public id: number;

    /** act_exchange_reward_type rewards. */
    public rewards: Iactive_item_type;

    /** act_exchange_reward_type playerGotTimes. */
    public playerGotTimes: number;

    /** act_exchange_reward_type worldGotTimes. */
    public worldGotTimes: number;

    /**
     * Creates a new act_exchange_reward_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_exchange_reward_type instance
     */
    public static create(properties?: Iact_exchange_reward_type): act_exchange_reward_type;

    /**
     * Encodes the specified act_exchange_reward_type message. Does not implicitly {@link act_exchange_reward_type.verify|verify} messages.
     * @param message act_exchange_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_exchange_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_exchange_reward_type message, length delimited. Does not implicitly {@link act_exchange_reward_type.verify|verify} messages.
     * @param message act_exchange_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_exchange_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_exchange_reward_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_exchange_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_exchange_reward_type;

    /**
     * Decodes an act_exchange_reward_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_exchange_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_exchange_reward_type;

    /**
     * Verifies an act_exchange_reward_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_exchange_reward_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_exchange_reward_type
     */
    public static fromObject(object: { [k: string]: any }): act_exchange_reward_type;

    /**
     * Creates a plain object from an act_exchange_reward_type message. Also converts values to other types if specified.
     * @param message act_exchange_reward_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_exchange_reward_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_exchange_reward_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_ririling_reward_type. */
export class act_ririling_reward_type implements Iact_ririling_reward_type {

    /**
     * Constructs a new act_ririling_reward_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_ririling_reward_type);

    /** act_ririling_reward_type id. */
    public id: number;

    /** act_ririling_reward_type rewards. */
    public rewards: Iactive_item_type;

    /** act_ririling_reward_type playerGotTimes. */
    public playerGotTimes: number;

    /** act_ririling_reward_type worldGotTimes. */
    public worldGotTimes: number;

    /** act_ririling_reward_type playActiveScore. */
    public playActiveScore: (number|Long);

    /**
     * Creates a new act_ririling_reward_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_ririling_reward_type instance
     */
    public static create(properties?: Iact_ririling_reward_type): act_ririling_reward_type;

    /**
     * Encodes the specified act_ririling_reward_type message. Does not implicitly {@link act_ririling_reward_type.verify|verify} messages.
     * @param message act_ririling_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_ririling_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_ririling_reward_type message, length delimited. Does not implicitly {@link act_ririling_reward_type.verify|verify} messages.
     * @param message act_ririling_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_ririling_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_ririling_reward_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_ririling_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_ririling_reward_type;

    /**
     * Decodes an act_ririling_reward_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_ririling_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_ririling_reward_type;

    /**
     * Verifies an act_ririling_reward_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_ririling_reward_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_ririling_reward_type
     */
    public static fromObject(object: { [k: string]: any }): act_ririling_reward_type;

    /**
     * Creates a plain object from an act_ririling_reward_type message. Also converts values to other types if specified.
     * @param message act_ririling_reward_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_ririling_reward_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_ririling_reward_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an act_kongtou_reward_type. */
export class act_kongtou_reward_type implements Iact_kongtou_reward_type {

    /**
     * Constructs a new act_kongtou_reward_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iact_kongtou_reward_type);

    /** act_kongtou_reward_type itemId. */
    public itemId: number;

    /** act_kongtou_reward_type ratio. */
    public ratio: number;

    /** act_kongtou_reward_type reward. */
    public reward: (number|Long);

    /**
     * Creates a new act_kongtou_reward_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns act_kongtou_reward_type instance
     */
    public static create(properties?: Iact_kongtou_reward_type): act_kongtou_reward_type;

    /**
     * Encodes the specified act_kongtou_reward_type message. Does not implicitly {@link act_kongtou_reward_type.verify|verify} messages.
     * @param message act_kongtou_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iact_kongtou_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified act_kongtou_reward_type message, length delimited. Does not implicitly {@link act_kongtou_reward_type.verify|verify} messages.
     * @param message act_kongtou_reward_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iact_kongtou_reward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an act_kongtou_reward_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns act_kongtou_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): act_kongtou_reward_type;

    /**
     * Decodes an act_kongtou_reward_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns act_kongtou_reward_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): act_kongtou_reward_type;

    /**
     * Verifies an act_kongtou_reward_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an act_kongtou_reward_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns act_kongtou_reward_type
     */
    public static fromObject(object: { [k: string]: any }): act_kongtou_reward_type;

    /**
     * Creates a plain object from an act_kongtou_reward_type message. Also converts values to other types if specified.
     * @param message act_kongtou_reward_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: act_kongtou_reward_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this act_kongtou_reward_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an active_item_type. */
export class active_item_type implements Iactive_item_type {

    /**
     * Constructs a new active_item_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iactive_item_type);

    /** active_item_type itemId. */
    public itemId: number;

    /** active_item_type num. */
    public num: (number|Long);

    /**
     * Creates a new active_item_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns active_item_type instance
     */
    public static create(properties?: Iactive_item_type): active_item_type;

    /**
     * Encodes the specified active_item_type message. Does not implicitly {@link active_item_type.verify|verify} messages.
     * @param message active_item_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iactive_item_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified active_item_type message, length delimited. Does not implicitly {@link active_item_type.verify|verify} messages.
     * @param message active_item_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iactive_item_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an active_item_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns active_item_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): active_item_type;

    /**
     * Decodes an active_item_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns active_item_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): active_item_type;

    /**
     * Verifies an active_item_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an active_item_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns active_item_type
     */
    public static fromObject(object: { [k: string]: any }): active_item_type;

    /**
     * Creates a plain object from an active_item_type message. Also converts values to other types if specified.
     * @param message active_item_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: active_item_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this active_item_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** active_type enum. */
export enum active_type {
    jifen = 1,
    jinbiaosai = 2,
    tainti = 3,
    tianjianghongbao = 4,
    hongbaoririling = 5
}

/** act_operate_type enum. */
export enum act_operate_type {
    lottery = 1,
    exchange = 2,
    ririling = 3,
    kongtou = 4
}

/** act_lottery_type enum. */
export enum act_lottery_type {
    once = 1,
    multi = 2
}

/** act_rank_type enum. */
export enum act_rank_type {
    jifen_rank = 1001,
    yingli_rank = 1002,
    yingfen_rank = 1003,
    jisha_rank = 1004
}

/** base_cmd enum. */
export enum base_cmd {
    heartBeatReq = 0,
    heartBeatResp = 1
}

/** Represents a msg_base_service */
export class msg_base_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_base_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_base_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_base_service;
}

/** Represents a heartBeatReq. */
export class heartBeatReq implements IheartBeatReq {

    /**
     * Constructs a new heartBeatReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IheartBeatReq);

    /** heartBeatReq id. */
    public id: number;

    /**
     * Creates a new heartBeatReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns heartBeatReq instance
     */
    public static create(properties?: IheartBeatReq): heartBeatReq;

    /**
     * Encodes the specified heartBeatReq message. Does not implicitly {@link heartBeatReq.verify|verify} messages.
     * @param message heartBeatReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IheartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified heartBeatReq message, length delimited. Does not implicitly {@link heartBeatReq.verify|verify} messages.
     * @param message heartBeatReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IheartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a heartBeatReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns heartBeatReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): heartBeatReq;

    /**
     * Decodes a heartBeatReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns heartBeatReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): heartBeatReq;

    /**
     * Verifies a heartBeatReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a heartBeatReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns heartBeatReq
     */
    public static fromObject(object: { [k: string]: any }): heartBeatReq;

    /**
     * Creates a plain object from a heartBeatReq message. Also converts values to other types if specified.
     * @param message heartBeatReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: heartBeatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this heartBeatReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a heartBeatResp. */
export class heartBeatResp implements IheartBeatResp {

    /**
     * Constructs a new heartBeatResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IheartBeatResp);

    /** heartBeatResp time. */
    public time: (number|Long);

    /** heartBeatResp id. */
    public id: number;

    /**
     * Creates a new heartBeatResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns heartBeatResp instance
     */
    public static create(properties?: IheartBeatResp): heartBeatResp;

    /**
     * Encodes the specified heartBeatResp message. Does not implicitly {@link heartBeatResp.verify|verify} messages.
     * @param message heartBeatResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IheartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified heartBeatResp message, length delimited. Does not implicitly {@link heartBeatResp.verify|verify} messages.
     * @param message heartBeatResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IheartBeatResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a heartBeatResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns heartBeatResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): heartBeatResp;

    /**
     * Decodes a heartBeatResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns heartBeatResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): heartBeatResp;

    /**
     * Verifies a heartBeatResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a heartBeatResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns heartBeatResp
     */
    public static fromObject(object: { [k: string]: any }): heartBeatResp;

    /**
     * Creates a plain object from a heartBeatResp message. Also converts values to other types if specified.
     * @param message heartBeatResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: heartBeatResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this heartBeatResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** broadcast_cmd enum. */
export enum broadcast_cmd {
    marqueePush = 0
}

/** Represents a msg_broadcast_service */
export class msg_broadcast_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_broadcast_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_broadcast_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_broadcast_service;
}

/** Represents a marqueePush. */
export class marqueePush implements ImarqueePush {

    /**
     * Constructs a new marqueePush.
     * @param [properties] Properties to set
     */
    constructor(properties?: ImarqueePush);

    /** marqueePush id. */
    public id: number;

    /** marqueePush type. */
    public type: number;

    /** marqueePush priority. */
    public priority: number;

    /** marqueePush executed. */
    public executed: number;

    /** marqueePush startTime. */
    public startTime: number;

    /** marqueePush endTime. */
    public endTime: number;

    /** marqueePush intervalTime. */
    public intervalTime: number;

    /** marqueePush limitTime. */
    public limitTime: number;

    /** marqueePush platMsg. */
    public platMsg: string;

    /** marqueePush gameMsg. */
    public gameMsg?: (Igame_marquee|null);

    /**
     * Creates a new marqueePush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns marqueePush instance
     */
    public static create(properties?: ImarqueePush): marqueePush;

    /**
     * Encodes the specified marqueePush message. Does not implicitly {@link marqueePush.verify|verify} messages.
     * @param message marqueePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ImarqueePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified marqueePush message, length delimited. Does not implicitly {@link marqueePush.verify|verify} messages.
     * @param message marqueePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ImarqueePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a marqueePush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns marqueePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): marqueePush;

    /**
     * Decodes a marqueePush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns marqueePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): marqueePush;

    /**
     * Verifies a marqueePush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a marqueePush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns marqueePush
     */
    public static fromObject(object: { [k: string]: any }): marqueePush;

    /**
     * Creates a plain object from a marqueePush message. Also converts values to other types if specified.
     * @param message marqueePush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: marqueePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this marqueePush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a game_marquee. */
export class game_marquee implements Igame_marquee {

    /**
     * Constructs a new game_marquee.
     * @param [properties] Properties to set
     */
    constructor(properties?: Igame_marquee);

    /** game_marquee ruleContent. */
    public ruleContent: string;

    /** game_marquee contentList. */
    public contentList: Icontent[];

    /**
     * Creates a new game_marquee instance using the specified properties.
     * @param [properties] Properties to set
     * @returns game_marquee instance
     */
    public static create(properties?: Igame_marquee): game_marquee;

    /**
     * Encodes the specified game_marquee message. Does not implicitly {@link game_marquee.verify|verify} messages.
     * @param message game_marquee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Igame_marquee, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified game_marquee message, length delimited. Does not implicitly {@link game_marquee.verify|verify} messages.
     * @param message game_marquee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Igame_marquee, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a game_marquee message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns game_marquee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game_marquee;

    /**
     * Decodes a game_marquee message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns game_marquee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game_marquee;

    /**
     * Verifies a game_marquee message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a game_marquee message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns game_marquee
     */
    public static fromObject(object: { [k: string]: any }): game_marquee;

    /**
     * Creates a plain object from a game_marquee message. Also converts values to other types if specified.
     * @param message game_marquee
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: game_marquee, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this game_marquee to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a content. */
export class content implements Icontent {

    /**
     * Constructs a new content.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icontent);

    /** content type. */
    public type: msg_type;

    /** content chars. */
    public chars: string;

    /** content number. */
    public number: (number|Long);

    /**
     * Creates a new content instance using the specified properties.
     * @param [properties] Properties to set
     * @returns content instance
     */
    public static create(properties?: Icontent): content;

    /**
     * Encodes the specified content message. Does not implicitly {@link content.verify|verify} messages.
     * @param message content message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icontent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified content message, length delimited. Does not implicitly {@link content.verify|verify} messages.
     * @param message content message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icontent, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a content message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns content
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): content;

    /**
     * Decodes a content message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns content
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): content;

    /**
     * Verifies a content message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a content message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns content
     */
    public static fromObject(object: { [k: string]: any }): content;

    /**
     * Creates a plain object from a content message. Also converts values to other types if specified.
     * @param message content
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: content, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this content to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** msg_type enum. */
export enum msg_type {
    chars = 0,
    number = 1
}

/** chat_cmd enum. */
export enum chat_cmd {
    chatReq = 1,
    chatPush = 2
}

/** Represents a msg_chat_service */
export class msg_chat_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_chat_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_chat_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_chat_service;
}

/** Represents a chatReq. */
export class chatReq implements IchatReq {

    /**
     * Constructs a new chatReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IchatReq);

    /** chatReq content. */
    public content: string;

    /**
     * Creates a new chatReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns chatReq instance
     */
    public static create(properties?: IchatReq): chatReq;

    /**
     * Encodes the specified chatReq message. Does not implicitly {@link chatReq.verify|verify} messages.
     * @param message chatReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IchatReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified chatReq message, length delimited. Does not implicitly {@link chatReq.verify|verify} messages.
     * @param message chatReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IchatReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a chatReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns chatReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chatReq;

    /**
     * Decodes a chatReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns chatReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chatReq;

    /**
     * Verifies a chatReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a chatReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns chatReq
     */
    public static fromObject(object: { [k: string]: any }): chatReq;

    /**
     * Creates a plain object from a chatReq message. Also converts values to other types if specified.
     * @param message chatReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: chatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this chatReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a chatPush. */
export class chatPush implements IchatPush {

    /**
     * Constructs a new chatPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IchatPush);

    /** chatPush content. */
    public content: string;

    /** chatPush pos. */
    public pos: number;

    /**
     * Creates a new chatPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns chatPush instance
     */
    public static create(properties?: IchatPush): chatPush;

    /**
     * Encodes the specified chatPush message. Does not implicitly {@link chatPush.verify|verify} messages.
     * @param message chatPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IchatPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified chatPush message, length delimited. Does not implicitly {@link chatPush.verify|verify} messages.
     * @param message chatPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IchatPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a chatPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns chatPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chatPush;

    /**
     * Decodes a chatPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns chatPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chatPush;

    /**
     * Verifies a chatPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a chatPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns chatPush
     */
    public static fromObject(object: { [k: string]: any }): chatPush;

    /**
     * Creates a plain object from a chatPush message. Also converts values to other types if specified.
     * @param message chatPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: chatPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this chatPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** code_type enum. */
export enum code_type {
    login_fail = 10001,
    req_frequently = 10002,
    account_forbidden = 10003,
    token_error = 10004,
    token_check_fail = 10005,
    token_timeout = 10006,
    token_invalable = 10007,
    user_not_exist = 10008,
    other_login = 10009,
    force_kick = 10010,
    server_stop = 10011,
    get_scores_fail = 10012,
    enter_game_fail = 10013,
    create_friend_room_fail = 10014,
    join_friend_room_fail = 10015,
    max_count_limit = 10016,
    room_not_exist = 10017,
    change_room_fail = 10018,
    leave_room_fail = 10019,
    get_lv_award_fail = 10020,
    get_fund_award_fail = 10021,
    buy_fund_fail = 10022,
    get_active_base_fail = 10023,
    active_rank_fail = 10024,
    active_call_fail = 10025,
    active_jifen_fail = 10026,
    active_times_fail = 10027,
    active_out_fail = 10028,
    get_friend_room_config_fail = 10029,
    get_friend_room_info_fail = 10030
}

/** Represents an undefined. */
export class undefined implements Iundefined {

    /**
     * Constructs a new undefined.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iundefined);

    /**
     * Creates a new undefined instance using the specified properties.
     * @param [properties] Properties to set
     * @returns undefined instance
     */
    public static create(properties?: Iundefined): void;

    /**
     * Encodes the specified undefined message. Does not implicitly {@link undefined.verify|verify} messages.
     * @param message undefined message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iundefined, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified undefined message, length delimited. Does not implicitly {@link undefined.verify|verify} messages.
     * @param message undefined message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iundefined, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an undefined message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns undefined
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): void;

    /**
     * Decodes an undefined message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns undefined
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): void;

    /**
     * Verifies an undefined message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an undefined message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns undefined
     */
    public static fromObject(object: { [k: string]: any }): void;

    /**
     * Creates a plain object from an undefined message. Also converts values to other types if specified.
     * @param message undefined
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: undefined, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this undefined to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** error_code_cmd enum. */
export enum error_code_cmd {
    errorCodePush = 0
}

/** Represents a msg_error_code_service */
export class msg_error_code_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_error_code_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_error_code_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_error_code_service;
}

/** Represents an errorCodePush. */
export class errorCodePush implements IerrorCodePush {

    /**
     * Constructs a new errorCodePush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IerrorCodePush);

    /** errorCodePush cmd. */
    public cmd: (number|Long);

    /** errorCodePush code. */
    public code: (number|Long);

    /** errorCodePush content. */
    public content: string;

    /**
     * Creates a new errorCodePush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns errorCodePush instance
     */
    public static create(properties?: IerrorCodePush): errorCodePush;

    /**
     * Encodes the specified errorCodePush message. Does not implicitly {@link errorCodePush.verify|verify} messages.
     * @param message errorCodePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IerrorCodePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified errorCodePush message, length delimited. Does not implicitly {@link errorCodePush.verify|verify} messages.
     * @param message errorCodePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IerrorCodePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an errorCodePush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns errorCodePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errorCodePush;

    /**
     * Decodes an errorCodePush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns errorCodePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errorCodePush;

    /**
     * Verifies an errorCodePush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an errorCodePush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns errorCodePush
     */
    public static fromObject(object: { [k: string]: any }): errorCodePush;

    /**
     * Creates a plain object from an errorCodePush message. Also converts values to other types if specified.
     * @param message errorCodePush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: errorCodePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this errorCodePush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** gm_cmd enum. */
export enum gm_cmd {
    gmReq = 1,
    gmResp = 2
}

/** Represents a msg_gm_service */
export class msg_gm_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_gm_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_gm_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_gm_service;
}

/** Represents a gmReq. */
export class gmReq implements IgmReq {

    /**
     * Constructs a new gmReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgmReq);

    /** gmReq gmStr. */
    public gmStr: string;

    /**
     * Creates a new gmReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns gmReq instance
     */
    public static create(properties?: IgmReq): gmReq;

    /**
     * Encodes the specified gmReq message. Does not implicitly {@link gmReq.verify|verify} messages.
     * @param message gmReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgmReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified gmReq message, length delimited. Does not implicitly {@link gmReq.verify|verify} messages.
     * @param message gmReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgmReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a gmReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns gmReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gmReq;

    /**
     * Decodes a gmReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns gmReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gmReq;

    /**
     * Verifies a gmReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a gmReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns gmReq
     */
    public static fromObject(object: { [k: string]: any }): gmReq;

    /**
     * Creates a plain object from a gmReq message. Also converts values to other types if specified.
     * @param message gmReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: gmReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this gmReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a gmResp. */
export class gmResp implements IgmResp {

    /**
     * Constructs a new gmResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgmResp);

    /** gmResp data. */
    public data?: (Idata_type|null);

    /** gmResp accVal. */
    public accVal?: (Ivillage_return|null);

    /**
     * Creates a new gmResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns gmResp instance
     */
    public static create(properties?: IgmResp): gmResp;

    /**
     * Encodes the specified gmResp message. Does not implicitly {@link gmResp.verify|verify} messages.
     * @param message gmResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgmResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified gmResp message, length delimited. Does not implicitly {@link gmResp.verify|verify} messages.
     * @param message gmResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgmResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a gmResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns gmResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gmResp;

    /**
     * Decodes a gmResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns gmResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gmResp;

    /**
     * Verifies a gmResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a gmResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns gmResp
     */
    public static fromObject(object: { [k: string]: any }): gmResp;

    /**
     * Creates a plain object from a gmResp message. Also converts values to other types if specified.
     * @param message gmResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: gmResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this gmResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a data_type. */
export class data_type implements Idata_type {

    /**
     * Constructs a new data_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Idata_type);

    /** data_type mergeId. */
    public mergeId: (number|Long);

    /** data_type poolData. */
    public poolData: Ipool_type[];

    /** data_type gameCount. */
    public gameCount: (number|Long);

    /** data_type costs. */
    public costs: (number|Long);

    /** data_type averageValue. */
    public averageValue: number;

    /** data_type rtp. */
    public rtp: (number|Long);

    /** data_type dayCosts. */
    public dayCosts: (number|Long);

    /** data_type dayBonus. */
    public dayBonus: (number|Long);

    /** data_type checkGameCount. */
    public checkGameCount: (number|Long);

    /** data_type userStatus. */
    public userStatus: number;

    /** data_type hunterRtp. */
    public hunterRtp: number;

    /** data_type isNewer. */
    public isNewer: boolean;

    /**
     * Creates a new data_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns data_type instance
     */
    public static create(properties?: Idata_type): data_type;

    /**
     * Encodes the specified data_type message. Does not implicitly {@link data_type.verify|verify} messages.
     * @param message data_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Idata_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified data_type message, length delimited. Does not implicitly {@link data_type.verify|verify} messages.
     * @param message data_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Idata_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a data_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns data_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): data_type;

    /**
     * Decodes a data_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns data_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): data_type;

    /**
     * Verifies a data_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a data_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns data_type
     */
    public static fromObject(object: { [k: string]: any }): data_type;

    /**
     * Creates a plain object from a data_type message. Also converts values to other types if specified.
     * @param message data_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: data_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this data_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a village_return. */
export class village_return implements Ivillage_return {

    /**
     * Constructs a new village_return.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ivillage_return);

    /** village_return villageVal. */
    public villageVal: (number|Long);

    /** village_return returnVal. */
    public returnVal: (number|Long);

    /**
     * Creates a new village_return instance using the specified properties.
     * @param [properties] Properties to set
     * @returns village_return instance
     */
    public static create(properties?: Ivillage_return): village_return;

    /**
     * Encodes the specified village_return message. Does not implicitly {@link village_return.verify|verify} messages.
     * @param message village_return message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ivillage_return, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified village_return message, length delimited. Does not implicitly {@link village_return.verify|verify} messages.
     * @param message village_return message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ivillage_return, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a village_return message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns village_return
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): village_return;

    /**
     * Decodes a village_return message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns village_return
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): village_return;

    /**
     * Verifies a village_return message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a village_return message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns village_return
     */
    public static fromObject(object: { [k: string]: any }): village_return;

    /**
     * Creates a plain object from a village_return message. Also converts values to other types if specified.
     * @param message village_return
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: village_return, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this village_return to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a pool_type. */
export class pool_type implements Ipool_type {

    /**
     * Constructs a new pool_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipool_type);

    /** pool_type poolId. */
    public poolId: (number|Long);

    /** pool_type poolVal. */
    public poolVal: (number|Long);

    /** pool_type accVal. */
    public accVal: (number|Long);

    /**
     * Creates a new pool_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns pool_type instance
     */
    public static create(properties?: Ipool_type): pool_type;

    /**
     * Encodes the specified pool_type message. Does not implicitly {@link pool_type.verify|verify} messages.
     * @param message pool_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipool_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified pool_type message, length delimited. Does not implicitly {@link pool_type.verify|verify} messages.
     * @param message pool_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipool_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a pool_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns pool_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pool_type;

    /**
     * Decodes a pool_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns pool_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pool_type;

    /**
     * Verifies a pool_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a pool_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns pool_type
     */
    public static fromObject(object: { [k: string]: any }): pool_type;

    /**
     * Creates a plain object from a pool_type message. Also converts values to other types if specified.
     * @param message pool_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: pool_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this pool_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** login_cmd enum. */
export enum login_cmd {
    loginReq = 0,
    loginResp = 1,
    miniGameLoginReq = 2,
    miniGameLoginResp = 3
}

/** Represents a msg_login_service */
export class msg_login_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_login_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_login_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_login_service;
}

/** Represents a loginReq. */
export class loginReq implements IloginReq {

    /**
     * Constructs a new loginReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IloginReq);

    /** loginReq token. */
    public token: string;

    /** loginReq lang. */
    public lang: string;

    /** loginReq code. */
    public code: string;

    /**
     * Creates a new loginReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns loginReq instance
     */
    public static create(properties?: IloginReq): loginReq;

    /**
     * Encodes the specified loginReq message. Does not implicitly {@link loginReq.verify|verify} messages.
     * @param message loginReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IloginReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified loginReq message, length delimited. Does not implicitly {@link loginReq.verify|verify} messages.
     * @param message loginReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IloginReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a loginReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns loginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): loginReq;

    /**
     * Decodes a loginReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns loginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): loginReq;

    /**
     * Verifies a loginReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a loginReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns loginReq
     */
    public static fromObject(object: { [k: string]: any }): loginReq;

    /**
     * Creates a plain object from a loginReq message. Also converts values to other types if specified.
     * @param message loginReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: loginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this loginReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a loginResp. */
export class loginResp implements IloginResp {

    /**
     * Constructs a new loginResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IloginResp);

    /** loginResp userInfo. */
    public userInfo: Iuser_info;

    /** loginResp reconnectToken. */
    public reconnectToken: string;

    /** loginResp isNormal. */
    public isNormal: boolean;

    /** loginResp isReconnect. */
    public isReconnect: boolean;

    /** loginResp switch. */
    public switch?: (Iswitch_type|null);

    /**
     * Creates a new loginResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns loginResp instance
     */
    public static create(properties?: IloginResp): loginResp;

    /**
     * Encodes the specified loginResp message. Does not implicitly {@link loginResp.verify|verify} messages.
     * @param message loginResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IloginResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified loginResp message, length delimited. Does not implicitly {@link loginResp.verify|verify} messages.
     * @param message loginResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IloginResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a loginResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns loginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): loginResp;

    /**
     * Decodes a loginResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns loginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): loginResp;

    /**
     * Verifies a loginResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a loginResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns loginResp
     */
    public static fromObject(object: { [k: string]: any }): loginResp;

    /**
     * Creates a plain object from a loginResp message. Also converts values to other types if specified.
     * @param message loginResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: loginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this loginResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a switch_type. */
export class switch_type implements Iswitch_type {

    /**
     * Constructs a new switch_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iswitch_type);

    /** switch_type gm. */
    public gm: number;

    /** switch_type fund. */
    public fund: number;

    /** switch_type lvReward. */
    public lvReward: number;

    /** switch_type rollerMode. */
    public rollerMode: number;

    /** switch_type smallRoller. */
    public smallRoller: number;

    /** switch_type slotMulti. */
    public slotMulti: number;

    /** switch_type slotJp. */
    public slotJp: number;

    /** switch_type hunterJp. */
    public hunterJp: number;

    /**
     * Creates a new switch_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns switch_type instance
     */
    public static create(properties?: Iswitch_type): switch_type;

    /**
     * Encodes the specified switch_type message. Does not implicitly {@link switch_type.verify|verify} messages.
     * @param message switch_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iswitch_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified switch_type message, length delimited. Does not implicitly {@link switch_type.verify|verify} messages.
     * @param message switch_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iswitch_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a switch_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns switch_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): switch_type;

    /**
     * Decodes a switch_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns switch_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): switch_type;

    /**
     * Verifies a switch_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a switch_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns switch_type
     */
    public static fromObject(object: { [k: string]: any }): switch_type;

    /**
     * Creates a plain object from a switch_type message. Also converts values to other types if specified.
     * @param message switch_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: switch_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this switch_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a miniGameLoginReq. */
export class miniGameLoginReq implements IminiGameLoginReq {

    /**
     * Constructs a new miniGameLoginReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IminiGameLoginReq);

    /** miniGameLoginReq appId. */
    public appId: string;

    /** miniGameLoginReq timeMs. */
    public timeMs: (number|Long);

    /** miniGameLoginReq openId. */
    public openId: string;

    /** miniGameLoginReq sign. */
    public sign: string;

    /** miniGameLoginReq isLogin. */
    public isLogin: boolean;

    /**
     * Creates a new miniGameLoginReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns miniGameLoginReq instance
     */
    public static create(properties?: IminiGameLoginReq): miniGameLoginReq;

    /**
     * Encodes the specified miniGameLoginReq message. Does not implicitly {@link miniGameLoginReq.verify|verify} messages.
     * @param message miniGameLoginReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IminiGameLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified miniGameLoginReq message, length delimited. Does not implicitly {@link miniGameLoginReq.verify|verify} messages.
     * @param message miniGameLoginReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IminiGameLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a miniGameLoginReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns miniGameLoginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miniGameLoginReq;

    /**
     * Decodes a miniGameLoginReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns miniGameLoginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miniGameLoginReq;

    /**
     * Verifies a miniGameLoginReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a miniGameLoginReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns miniGameLoginReq
     */
    public static fromObject(object: { [k: string]: any }): miniGameLoginReq;

    /**
     * Creates a plain object from a miniGameLoginReq message. Also converts values to other types if specified.
     * @param message miniGameLoginReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: miniGameLoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this miniGameLoginReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a miniGameLoginResp. */
export class miniGameLoginResp implements IminiGameLoginResp {

    /**
     * Constructs a new miniGameLoginResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IminiGameLoginResp);

    /** miniGameLoginResp reconnectToken. */
    public reconnectToken: string;

    /** miniGameLoginResp isReconnect. */
    public isReconnect: boolean;

    /**
     * Creates a new miniGameLoginResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns miniGameLoginResp instance
     */
    public static create(properties?: IminiGameLoginResp): miniGameLoginResp;

    /**
     * Encodes the specified miniGameLoginResp message. Does not implicitly {@link miniGameLoginResp.verify|verify} messages.
     * @param message miniGameLoginResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IminiGameLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified miniGameLoginResp message, length delimited. Does not implicitly {@link miniGameLoginResp.verify|verify} messages.
     * @param message miniGameLoginResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IminiGameLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a miniGameLoginResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns miniGameLoginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miniGameLoginResp;

    /**
     * Decodes a miniGameLoginResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns miniGameLoginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miniGameLoginResp;

    /**
     * Verifies a miniGameLoginResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a miniGameLoginResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns miniGameLoginResp
     */
    public static fromObject(object: { [k: string]: any }): miniGameLoginResp;

    /**
     * Creates a plain object from a miniGameLoginResp message. Also converts values to other types if specified.
     * @param message miniGameLoginResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: miniGameLoginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this miniGameLoginResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** room_cmd enum. */
export enum room_cmd {
    createFriendRoomReq = 0,
    createFriendRoomResp = 1,
    joinFriendRoomReq = 2,
    joinFriendRoomResp = 3,
    enterRoomReq = 4,
    enterRoomResp = 5,
    changeRoomReq = 6,
    changeRoomResp = 7,
    leaveRoomReq = 8,
    leaveRoomResp = 9,
    readyReq = 10,
    startMatchReq = 11,
    startMatchResp = 12,
    cancelMatchReq = 13,
    cancelMatchResp = 14,
    qzdzFriendRoomConfigReq = 15,
    qzdzFriendRoomConfigResp = 16,
    qzdzCreateFriendRoomReq = 17,
    qzdzCreateFriendRoomResp = 18,
    qzdzFriendRoomInfoReq = 19,
    qzdzFriendRoomInfoResp = 20,
    qzdzJoinFriendRoomReq = 21,
    qzdzJoinFriendRoomResp = 22
}

/** Represents a msg_room_service */
export class msg_room_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_room_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_room_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_room_service;
}

/** Represents a createFriendRoomReq. */
export class createFriendRoomReq implements IcreateFriendRoomReq {

    /**
     * Constructs a new createFriendRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IcreateFriendRoomReq);

    /** createFriendRoomReq roomType. */
    public roomType: number;

    /**
     * Creates a new createFriendRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns createFriendRoomReq instance
     */
    public static create(properties?: IcreateFriendRoomReq): createFriendRoomReq;

    /**
     * Encodes the specified createFriendRoomReq message. Does not implicitly {@link createFriendRoomReq.verify|verify} messages.
     * @param message createFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IcreateFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified createFriendRoomReq message, length delimited. Does not implicitly {@link createFriendRoomReq.verify|verify} messages.
     * @param message createFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IcreateFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a createFriendRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns createFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): createFriendRoomReq;

    /**
     * Decodes a createFriendRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns createFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): createFriendRoomReq;

    /**
     * Verifies a createFriendRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a createFriendRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns createFriendRoomReq
     */
    public static fromObject(object: { [k: string]: any }): createFriendRoomReq;

    /**
     * Creates a plain object from a createFriendRoomReq message. Also converts values to other types if specified.
     * @param message createFriendRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: createFriendRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this createFriendRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a createFriendRoomResp. */
export class createFriendRoomResp implements IcreateFriendRoomResp {

    /**
     * Constructs a new createFriendRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IcreateFriendRoomResp);

    /** createFriendRoomResp roomId. */
    public roomId: number;

    /**
     * Creates a new createFriendRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns createFriendRoomResp instance
     */
    public static create(properties?: IcreateFriendRoomResp): createFriendRoomResp;

    /**
     * Encodes the specified createFriendRoomResp message. Does not implicitly {@link createFriendRoomResp.verify|verify} messages.
     * @param message createFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IcreateFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified createFriendRoomResp message, length delimited. Does not implicitly {@link createFriendRoomResp.verify|verify} messages.
     * @param message createFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IcreateFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a createFriendRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns createFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): createFriendRoomResp;

    /**
     * Decodes a createFriendRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns createFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): createFriendRoomResp;

    /**
     * Verifies a createFriendRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a createFriendRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns createFriendRoomResp
     */
    public static fromObject(object: { [k: string]: any }): createFriendRoomResp;

    /**
     * Creates a plain object from a createFriendRoomResp message. Also converts values to other types if specified.
     * @param message createFriendRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: createFriendRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this createFriendRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a joinFriendRoomReq. */
export class joinFriendRoomReq implements IjoinFriendRoomReq {

    /**
     * Constructs a new joinFriendRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IjoinFriendRoomReq);

    /** joinFriendRoomReq roomId. */
    public roomId: number;

    /**
     * Creates a new joinFriendRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns joinFriendRoomReq instance
     */
    public static create(properties?: IjoinFriendRoomReq): joinFriendRoomReq;

    /**
     * Encodes the specified joinFriendRoomReq message. Does not implicitly {@link joinFriendRoomReq.verify|verify} messages.
     * @param message joinFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IjoinFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified joinFriendRoomReq message, length delimited. Does not implicitly {@link joinFriendRoomReq.verify|verify} messages.
     * @param message joinFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IjoinFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a joinFriendRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns joinFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): joinFriendRoomReq;

    /**
     * Decodes a joinFriendRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns joinFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): joinFriendRoomReq;

    /**
     * Verifies a joinFriendRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a joinFriendRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns joinFriendRoomReq
     */
    public static fromObject(object: { [k: string]: any }): joinFriendRoomReq;

    /**
     * Creates a plain object from a joinFriendRoomReq message. Also converts values to other types if specified.
     * @param message joinFriendRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: joinFriendRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this joinFriendRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a joinFriendRoomResp. */
export class joinFriendRoomResp implements IjoinFriendRoomResp {

    /**
     * Constructs a new joinFriendRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IjoinFriendRoomResp);

    /** joinFriendRoomResp roomType. */
    public roomType: number;

    /**
     * Creates a new joinFriendRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns joinFriendRoomResp instance
     */
    public static create(properties?: IjoinFriendRoomResp): joinFriendRoomResp;

    /**
     * Encodes the specified joinFriendRoomResp message. Does not implicitly {@link joinFriendRoomResp.verify|verify} messages.
     * @param message joinFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IjoinFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified joinFriendRoomResp message, length delimited. Does not implicitly {@link joinFriendRoomResp.verify|verify} messages.
     * @param message joinFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IjoinFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a joinFriendRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns joinFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): joinFriendRoomResp;

    /**
     * Decodes a joinFriendRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns joinFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): joinFriendRoomResp;

    /**
     * Verifies a joinFriendRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a joinFriendRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns joinFriendRoomResp
     */
    public static fromObject(object: { [k: string]: any }): joinFriendRoomResp;

    /**
     * Creates a plain object from a joinFriendRoomResp message. Also converts values to other types if specified.
     * @param message joinFriendRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: joinFriendRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this joinFriendRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an enterRoomReq. */
export class enterRoomReq implements IenterRoomReq {

    /**
     * Constructs a new enterRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IenterRoomReq);

    /** enterRoomReq roomType. */
    public roomType: number;

    /** enterRoomReq roomId. */
    public roomId: number;

    /**
     * Creates a new enterRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns enterRoomReq instance
     */
    public static create(properties?: IenterRoomReq): enterRoomReq;

    /**
     * Encodes the specified enterRoomReq message. Does not implicitly {@link enterRoomReq.verify|verify} messages.
     * @param message enterRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IenterRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified enterRoomReq message, length delimited. Does not implicitly {@link enterRoomReq.verify|verify} messages.
     * @param message enterRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IenterRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an enterRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns enterRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): enterRoomReq;

    /**
     * Decodes an enterRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns enterRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): enterRoomReq;

    /**
     * Verifies an enterRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an enterRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns enterRoomReq
     */
    public static fromObject(object: { [k: string]: any }): enterRoomReq;

    /**
     * Creates a plain object from an enterRoomReq message. Also converts values to other types if specified.
     * @param message enterRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: enterRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this enterRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an enterRoomResp. */
export class enterRoomResp implements IenterRoomResp {

    /**
     * Constructs a new enterRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IenterRoomResp);

    /**
     * Creates a new enterRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns enterRoomResp instance
     */
    public static create(properties?: IenterRoomResp): enterRoomResp;

    /**
     * Encodes the specified enterRoomResp message. Does not implicitly {@link enterRoomResp.verify|verify} messages.
     * @param message enterRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IenterRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified enterRoomResp message, length delimited. Does not implicitly {@link enterRoomResp.verify|verify} messages.
     * @param message enterRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IenterRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an enterRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns enterRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): enterRoomResp;

    /**
     * Decodes an enterRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns enterRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): enterRoomResp;

    /**
     * Verifies an enterRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an enterRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns enterRoomResp
     */
    public static fromObject(object: { [k: string]: any }): enterRoomResp;

    /**
     * Creates a plain object from an enterRoomResp message. Also converts values to other types if specified.
     * @param message enterRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: enterRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this enterRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a changeRoomReq. */
export class changeRoomReq implements IchangeRoomReq {

    /**
     * Constructs a new changeRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IchangeRoomReq);

    /** changeRoomReq roomId. */
    public roomId: number;

    /**
     * Creates a new changeRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns changeRoomReq instance
     */
    public static create(properties?: IchangeRoomReq): changeRoomReq;

    /**
     * Encodes the specified changeRoomReq message. Does not implicitly {@link changeRoomReq.verify|verify} messages.
     * @param message changeRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IchangeRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified changeRoomReq message, length delimited. Does not implicitly {@link changeRoomReq.verify|verify} messages.
     * @param message changeRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IchangeRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a changeRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns changeRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): changeRoomReq;

    /**
     * Decodes a changeRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns changeRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): changeRoomReq;

    /**
     * Verifies a changeRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a changeRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns changeRoomReq
     */
    public static fromObject(object: { [k: string]: any }): changeRoomReq;

    /**
     * Creates a plain object from a changeRoomReq message. Also converts values to other types if specified.
     * @param message changeRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: changeRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this changeRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a changeRoomResp. */
export class changeRoomResp implements IchangeRoomResp {

    /**
     * Constructs a new changeRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IchangeRoomResp);

    /**
     * Creates a new changeRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns changeRoomResp instance
     */
    public static create(properties?: IchangeRoomResp): changeRoomResp;

    /**
     * Encodes the specified changeRoomResp message. Does not implicitly {@link changeRoomResp.verify|verify} messages.
     * @param message changeRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IchangeRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified changeRoomResp message, length delimited. Does not implicitly {@link changeRoomResp.verify|verify} messages.
     * @param message changeRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IchangeRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a changeRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns changeRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): changeRoomResp;

    /**
     * Decodes a changeRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns changeRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): changeRoomResp;

    /**
     * Verifies a changeRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a changeRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns changeRoomResp
     */
    public static fromObject(object: { [k: string]: any }): changeRoomResp;

    /**
     * Creates a plain object from a changeRoomResp message. Also converts values to other types if specified.
     * @param message changeRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: changeRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this changeRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a leaveRoomReq. */
export class leaveRoomReq implements IleaveRoomReq {

    /**
     * Constructs a new leaveRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IleaveRoomReq);

    /**
     * Creates a new leaveRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns leaveRoomReq instance
     */
    public static create(properties?: IleaveRoomReq): leaveRoomReq;

    /**
     * Encodes the specified leaveRoomReq message. Does not implicitly {@link leaveRoomReq.verify|verify} messages.
     * @param message leaveRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IleaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified leaveRoomReq message, length delimited. Does not implicitly {@link leaveRoomReq.verify|verify} messages.
     * @param message leaveRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IleaveRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a leaveRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns leaveRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): leaveRoomReq;

    /**
     * Decodes a leaveRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns leaveRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): leaveRoomReq;

    /**
     * Verifies a leaveRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a leaveRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns leaveRoomReq
     */
    public static fromObject(object: { [k: string]: any }): leaveRoomReq;

    /**
     * Creates a plain object from a leaveRoomReq message. Also converts values to other types if specified.
     * @param message leaveRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: leaveRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this leaveRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a leaveRoomResp. */
export class leaveRoomResp implements IleaveRoomResp {

    /**
     * Constructs a new leaveRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IleaveRoomResp);

    /**
     * Creates a new leaveRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns leaveRoomResp instance
     */
    public static create(properties?: IleaveRoomResp): leaveRoomResp;

    /**
     * Encodes the specified leaveRoomResp message. Does not implicitly {@link leaveRoomResp.verify|verify} messages.
     * @param message leaveRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IleaveRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified leaveRoomResp message, length delimited. Does not implicitly {@link leaveRoomResp.verify|verify} messages.
     * @param message leaveRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IleaveRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a leaveRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns leaveRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): leaveRoomResp;

    /**
     * Decodes a leaveRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns leaveRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): leaveRoomResp;

    /**
     * Verifies a leaveRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a leaveRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns leaveRoomResp
     */
    public static fromObject(object: { [k: string]: any }): leaveRoomResp;

    /**
     * Creates a plain object from a leaveRoomResp message. Also converts values to other types if specified.
     * @param message leaveRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: leaveRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this leaveRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a readyReq. */
export class readyReq implements IreadyReq {

    /**
     * Constructs a new readyReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IreadyReq);

    /**
     * Creates a new readyReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns readyReq instance
     */
    public static create(properties?: IreadyReq): readyReq;

    /**
     * Encodes the specified readyReq message. Does not implicitly {@link readyReq.verify|verify} messages.
     * @param message readyReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IreadyReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified readyReq message, length delimited. Does not implicitly {@link readyReq.verify|verify} messages.
     * @param message readyReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IreadyReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a readyReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns readyReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): readyReq;

    /**
     * Decodes a readyReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns readyReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): readyReq;

    /**
     * Verifies a readyReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a readyReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns readyReq
     */
    public static fromObject(object: { [k: string]: any }): readyReq;

    /**
     * Creates a plain object from a readyReq message. Also converts values to other types if specified.
     * @param message readyReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: readyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this readyReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a startMatchReq. */
export class startMatchReq implements IstartMatchReq {

    /**
     * Constructs a new startMatchReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IstartMatchReq);

    /** startMatchReq roomType. */
    public roomType: number;

    /** startMatchReq roomId. */
    public roomId: number;

    /**
     * Creates a new startMatchReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns startMatchReq instance
     */
    public static create(properties?: IstartMatchReq): startMatchReq;

    /**
     * Encodes the specified startMatchReq message. Does not implicitly {@link startMatchReq.verify|verify} messages.
     * @param message startMatchReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IstartMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified startMatchReq message, length delimited. Does not implicitly {@link startMatchReq.verify|verify} messages.
     * @param message startMatchReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IstartMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a startMatchReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns startMatchReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): startMatchReq;

    /**
     * Decodes a startMatchReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns startMatchReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): startMatchReq;

    /**
     * Verifies a startMatchReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a startMatchReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns startMatchReq
     */
    public static fromObject(object: { [k: string]: any }): startMatchReq;

    /**
     * Creates a plain object from a startMatchReq message. Also converts values to other types if specified.
     * @param message startMatchReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: startMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this startMatchReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a startMatchResp. */
export class startMatchResp implements IstartMatchResp {

    /**
     * Constructs a new startMatchResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IstartMatchResp);

    /**
     * Creates a new startMatchResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns startMatchResp instance
     */
    public static create(properties?: IstartMatchResp): startMatchResp;

    /**
     * Encodes the specified startMatchResp message. Does not implicitly {@link startMatchResp.verify|verify} messages.
     * @param message startMatchResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IstartMatchResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified startMatchResp message, length delimited. Does not implicitly {@link startMatchResp.verify|verify} messages.
     * @param message startMatchResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IstartMatchResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a startMatchResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns startMatchResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): startMatchResp;

    /**
     * Decodes a startMatchResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns startMatchResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): startMatchResp;

    /**
     * Verifies a startMatchResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a startMatchResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns startMatchResp
     */
    public static fromObject(object: { [k: string]: any }): startMatchResp;

    /**
     * Creates a plain object from a startMatchResp message. Also converts values to other types if specified.
     * @param message startMatchResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: startMatchResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this startMatchResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a cancelMatchReq. */
export class cancelMatchReq implements IcancelMatchReq {

    /**
     * Constructs a new cancelMatchReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IcancelMatchReq);

    /**
     * Creates a new cancelMatchReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns cancelMatchReq instance
     */
    public static create(properties?: IcancelMatchReq): cancelMatchReq;

    /**
     * Encodes the specified cancelMatchReq message. Does not implicitly {@link cancelMatchReq.verify|verify} messages.
     * @param message cancelMatchReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IcancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified cancelMatchReq message, length delimited. Does not implicitly {@link cancelMatchReq.verify|verify} messages.
     * @param message cancelMatchReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IcancelMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a cancelMatchReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns cancelMatchReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cancelMatchReq;

    /**
     * Decodes a cancelMatchReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns cancelMatchReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cancelMatchReq;

    /**
     * Verifies a cancelMatchReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a cancelMatchReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns cancelMatchReq
     */
    public static fromObject(object: { [k: string]: any }): cancelMatchReq;

    /**
     * Creates a plain object from a cancelMatchReq message. Also converts values to other types if specified.
     * @param message cancelMatchReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: cancelMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this cancelMatchReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a cancelMatchResp. */
export class cancelMatchResp implements IcancelMatchResp {

    /**
     * Constructs a new cancelMatchResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IcancelMatchResp);

    /**
     * Creates a new cancelMatchResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns cancelMatchResp instance
     */
    public static create(properties?: IcancelMatchResp): cancelMatchResp;

    /**
     * Encodes the specified cancelMatchResp message. Does not implicitly {@link cancelMatchResp.verify|verify} messages.
     * @param message cancelMatchResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IcancelMatchResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified cancelMatchResp message, length delimited. Does not implicitly {@link cancelMatchResp.verify|verify} messages.
     * @param message cancelMatchResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IcancelMatchResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a cancelMatchResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns cancelMatchResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cancelMatchResp;

    /**
     * Decodes a cancelMatchResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns cancelMatchResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cancelMatchResp;

    /**
     * Verifies a cancelMatchResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a cancelMatchResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns cancelMatchResp
     */
    public static fromObject(object: { [k: string]: any }): cancelMatchResp;

    /**
     * Creates a plain object from a cancelMatchResp message. Also converts values to other types if specified.
     * @param message cancelMatchResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: cancelMatchResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this cancelMatchResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzFriendRoomConfigReq. */
export class qzdzFriendRoomConfigReq implements IqzdzFriendRoomConfigReq {

    /**
     * Constructs a new qzdzFriendRoomConfigReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzFriendRoomConfigReq);

    /**
     * Creates a new qzdzFriendRoomConfigReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzFriendRoomConfigReq instance
     */
    public static create(properties?: IqzdzFriendRoomConfigReq): qzdzFriendRoomConfigReq;

    /**
     * Encodes the specified qzdzFriendRoomConfigReq message. Does not implicitly {@link qzdzFriendRoomConfigReq.verify|verify} messages.
     * @param message qzdzFriendRoomConfigReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzFriendRoomConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzFriendRoomConfigReq message, length delimited. Does not implicitly {@link qzdzFriendRoomConfigReq.verify|verify} messages.
     * @param message qzdzFriendRoomConfigReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzFriendRoomConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzFriendRoomConfigReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzFriendRoomConfigReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzFriendRoomConfigReq;

    /**
     * Decodes a qzdzFriendRoomConfigReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzFriendRoomConfigReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzFriendRoomConfigReq;

    /**
     * Verifies a qzdzFriendRoomConfigReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzFriendRoomConfigReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzFriendRoomConfigReq
     */
    public static fromObject(object: { [k: string]: any }): qzdzFriendRoomConfigReq;

    /**
     * Creates a plain object from a qzdzFriendRoomConfigReq message. Also converts values to other types if specified.
     * @param message qzdzFriendRoomConfigReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzFriendRoomConfigReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzFriendRoomConfigReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzFriendRoomConfigResp. */
export class qzdzFriendRoomConfigResp implements IqzdzFriendRoomConfigResp {

    /**
     * Constructs a new qzdzFriendRoomConfigResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzFriendRoomConfigResp);

    /** qzdzFriendRoomConfigResp config. */
    public config: Iqzdz_friend_room_config_type[];

    /**
     * Creates a new qzdzFriendRoomConfigResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzFriendRoomConfigResp instance
     */
    public static create(properties?: IqzdzFriendRoomConfigResp): qzdzFriendRoomConfigResp;

    /**
     * Encodes the specified qzdzFriendRoomConfigResp message. Does not implicitly {@link qzdzFriendRoomConfigResp.verify|verify} messages.
     * @param message qzdzFriendRoomConfigResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzFriendRoomConfigResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzFriendRoomConfigResp message, length delimited. Does not implicitly {@link qzdzFriendRoomConfigResp.verify|verify} messages.
     * @param message qzdzFriendRoomConfigResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzFriendRoomConfigResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzFriendRoomConfigResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzFriendRoomConfigResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzFriendRoomConfigResp;

    /**
     * Decodes a qzdzFriendRoomConfigResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzFriendRoomConfigResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzFriendRoomConfigResp;

    /**
     * Verifies a qzdzFriendRoomConfigResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzFriendRoomConfigResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzFriendRoomConfigResp
     */
    public static fromObject(object: { [k: string]: any }): qzdzFriendRoomConfigResp;

    /**
     * Creates a plain object from a qzdzFriendRoomConfigResp message. Also converts values to other types if specified.
     * @param message qzdzFriendRoomConfigResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzFriendRoomConfigResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzFriendRoomConfigResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzCreateFriendRoomReq. */
export class qzdzCreateFriendRoomReq implements IqzdzCreateFriendRoomReq {

    /**
     * Constructs a new qzdzCreateFriendRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzCreateFriendRoomReq);

    /** qzdzCreateFriendRoomReq config. */
    public config: Iqzdz_friend_room_config_type[];

    /**
     * Creates a new qzdzCreateFriendRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzCreateFriendRoomReq instance
     */
    public static create(properties?: IqzdzCreateFriendRoomReq): qzdzCreateFriendRoomReq;

    /**
     * Encodes the specified qzdzCreateFriendRoomReq message. Does not implicitly {@link qzdzCreateFriendRoomReq.verify|verify} messages.
     * @param message qzdzCreateFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzCreateFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzCreateFriendRoomReq message, length delimited. Does not implicitly {@link qzdzCreateFriendRoomReq.verify|verify} messages.
     * @param message qzdzCreateFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzCreateFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzCreateFriendRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzCreateFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzCreateFriendRoomReq;

    /**
     * Decodes a qzdzCreateFriendRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzCreateFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzCreateFriendRoomReq;

    /**
     * Verifies a qzdzCreateFriendRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzCreateFriendRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzCreateFriendRoomReq
     */
    public static fromObject(object: { [k: string]: any }): qzdzCreateFriendRoomReq;

    /**
     * Creates a plain object from a qzdzCreateFriendRoomReq message. Also converts values to other types if specified.
     * @param message qzdzCreateFriendRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzCreateFriendRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzCreateFriendRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzCreateFriendRoomResp. */
export class qzdzCreateFriendRoomResp implements IqzdzCreateFriendRoomResp {

    /**
     * Constructs a new qzdzCreateFriendRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzCreateFriendRoomResp);

    /** qzdzCreateFriendRoomResp roomId. */
    public roomId: number;

    /**
     * Creates a new qzdzCreateFriendRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzCreateFriendRoomResp instance
     */
    public static create(properties?: IqzdzCreateFriendRoomResp): qzdzCreateFriendRoomResp;

    /**
     * Encodes the specified qzdzCreateFriendRoomResp message. Does not implicitly {@link qzdzCreateFriendRoomResp.verify|verify} messages.
     * @param message qzdzCreateFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzCreateFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzCreateFriendRoomResp message, length delimited. Does not implicitly {@link qzdzCreateFriendRoomResp.verify|verify} messages.
     * @param message qzdzCreateFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzCreateFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzCreateFriendRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzCreateFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzCreateFriendRoomResp;

    /**
     * Decodes a qzdzCreateFriendRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzCreateFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzCreateFriendRoomResp;

    /**
     * Verifies a qzdzCreateFriendRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzCreateFriendRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzCreateFriendRoomResp
     */
    public static fromObject(object: { [k: string]: any }): qzdzCreateFriendRoomResp;

    /**
     * Creates a plain object from a qzdzCreateFriendRoomResp message. Also converts values to other types if specified.
     * @param message qzdzCreateFriendRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzCreateFriendRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzCreateFriendRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzFriendRoomInfoReq. */
export class qzdzFriendRoomInfoReq implements IqzdzFriendRoomInfoReq {

    /**
     * Constructs a new qzdzFriendRoomInfoReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzFriendRoomInfoReq);

    /** qzdzFriendRoomInfoReq roomId. */
    public roomId: number;

    /**
     * Creates a new qzdzFriendRoomInfoReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzFriendRoomInfoReq instance
     */
    public static create(properties?: IqzdzFriendRoomInfoReq): qzdzFriendRoomInfoReq;

    /**
     * Encodes the specified qzdzFriendRoomInfoReq message. Does not implicitly {@link qzdzFriendRoomInfoReq.verify|verify} messages.
     * @param message qzdzFriendRoomInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzFriendRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzFriendRoomInfoReq message, length delimited. Does not implicitly {@link qzdzFriendRoomInfoReq.verify|verify} messages.
     * @param message qzdzFriendRoomInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzFriendRoomInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzFriendRoomInfoReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzFriendRoomInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzFriendRoomInfoReq;

    /**
     * Decodes a qzdzFriendRoomInfoReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzFriendRoomInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzFriendRoomInfoReq;

    /**
     * Verifies a qzdzFriendRoomInfoReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzFriendRoomInfoReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzFriendRoomInfoReq
     */
    public static fromObject(object: { [k: string]: any }): qzdzFriendRoomInfoReq;

    /**
     * Creates a plain object from a qzdzFriendRoomInfoReq message. Also converts values to other types if specified.
     * @param message qzdzFriendRoomInfoReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzFriendRoomInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzFriendRoomInfoReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzFriendRoomInfoResp. */
export class qzdzFriendRoomInfoResp implements IqzdzFriendRoomInfoResp {

    /**
     * Constructs a new qzdzFriendRoomInfoResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzFriendRoomInfoResp);

    /** qzdzFriendRoomInfoResp config. */
    public config: Iqzdz_friend_room_config_type[];

    /**
     * Creates a new qzdzFriendRoomInfoResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzFriendRoomInfoResp instance
     */
    public static create(properties?: IqzdzFriendRoomInfoResp): qzdzFriendRoomInfoResp;

    /**
     * Encodes the specified qzdzFriendRoomInfoResp message. Does not implicitly {@link qzdzFriendRoomInfoResp.verify|verify} messages.
     * @param message qzdzFriendRoomInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzFriendRoomInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzFriendRoomInfoResp message, length delimited. Does not implicitly {@link qzdzFriendRoomInfoResp.verify|verify} messages.
     * @param message qzdzFriendRoomInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzFriendRoomInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzFriendRoomInfoResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzFriendRoomInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzFriendRoomInfoResp;

    /**
     * Decodes a qzdzFriendRoomInfoResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzFriendRoomInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzFriendRoomInfoResp;

    /**
     * Verifies a qzdzFriendRoomInfoResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzFriendRoomInfoResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzFriendRoomInfoResp
     */
    public static fromObject(object: { [k: string]: any }): qzdzFriendRoomInfoResp;

    /**
     * Creates a plain object from a qzdzFriendRoomInfoResp message. Also converts values to other types if specified.
     * @param message qzdzFriendRoomInfoResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzFriendRoomInfoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzFriendRoomInfoResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzJoinFriendRoomReq. */
export class qzdzJoinFriendRoomReq implements IqzdzJoinFriendRoomReq {

    /**
     * Constructs a new qzdzJoinFriendRoomReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzJoinFriendRoomReq);

    /** qzdzJoinFriendRoomReq roomId. */
    public roomId: number;

    /**
     * Creates a new qzdzJoinFriendRoomReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzJoinFriendRoomReq instance
     */
    public static create(properties?: IqzdzJoinFriendRoomReq): qzdzJoinFriendRoomReq;

    /**
     * Encodes the specified qzdzJoinFriendRoomReq message. Does not implicitly {@link qzdzJoinFriendRoomReq.verify|verify} messages.
     * @param message qzdzJoinFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzJoinFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzJoinFriendRoomReq message, length delimited. Does not implicitly {@link qzdzJoinFriendRoomReq.verify|verify} messages.
     * @param message qzdzJoinFriendRoomReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzJoinFriendRoomReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzJoinFriendRoomReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzJoinFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzJoinFriendRoomReq;

    /**
     * Decodes a qzdzJoinFriendRoomReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzJoinFriendRoomReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzJoinFriendRoomReq;

    /**
     * Verifies a qzdzJoinFriendRoomReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzJoinFriendRoomReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzJoinFriendRoomReq
     */
    public static fromObject(object: { [k: string]: any }): qzdzJoinFriendRoomReq;

    /**
     * Creates a plain object from a qzdzJoinFriendRoomReq message. Also converts values to other types if specified.
     * @param message qzdzJoinFriendRoomReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzJoinFriendRoomReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzJoinFriendRoomReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdzJoinFriendRoomResp. */
export class qzdzJoinFriendRoomResp implements IqzdzJoinFriendRoomResp {

    /**
     * Constructs a new qzdzJoinFriendRoomResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IqzdzJoinFriendRoomResp);

    /**
     * Creates a new qzdzJoinFriendRoomResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdzJoinFriendRoomResp instance
     */
    public static create(properties?: IqzdzJoinFriendRoomResp): qzdzJoinFriendRoomResp;

    /**
     * Encodes the specified qzdzJoinFriendRoomResp message. Does not implicitly {@link qzdzJoinFriendRoomResp.verify|verify} messages.
     * @param message qzdzJoinFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IqzdzJoinFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdzJoinFriendRoomResp message, length delimited. Does not implicitly {@link qzdzJoinFriendRoomResp.verify|verify} messages.
     * @param message qzdzJoinFriendRoomResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IqzdzJoinFriendRoomResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdzJoinFriendRoomResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdzJoinFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdzJoinFriendRoomResp;

    /**
     * Decodes a qzdzJoinFriendRoomResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdzJoinFriendRoomResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdzJoinFriendRoomResp;

    /**
     * Verifies a qzdzJoinFriendRoomResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdzJoinFriendRoomResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdzJoinFriendRoomResp
     */
    public static fromObject(object: { [k: string]: any }): qzdzJoinFriendRoomResp;

    /**
     * Creates a plain object from a qzdzJoinFriendRoomResp message. Also converts values to other types if specified.
     * @param message qzdzJoinFriendRoomResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdzJoinFriendRoomResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdzJoinFriendRoomResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a qzdz_friend_room_config_type. */
export class qzdz_friend_room_config_type implements Iqzdz_friend_room_config_type {

    /**
     * Constructs a new qzdz_friend_room_config_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iqzdz_friend_room_config_type);

    /** qzdz_friend_room_config_type configId. */
    public configId: qzdz_friend_room_config_id;

    /** qzdz_friend_room_config_type list. */
    public list: (number|Long)[];

    /**
     * Creates a new qzdz_friend_room_config_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns qzdz_friend_room_config_type instance
     */
    public static create(properties?: Iqzdz_friend_room_config_type): qzdz_friend_room_config_type;

    /**
     * Encodes the specified qzdz_friend_room_config_type message. Does not implicitly {@link qzdz_friend_room_config_type.verify|verify} messages.
     * @param message qzdz_friend_room_config_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iqzdz_friend_room_config_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified qzdz_friend_room_config_type message, length delimited. Does not implicitly {@link qzdz_friend_room_config_type.verify|verify} messages.
     * @param message qzdz_friend_room_config_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iqzdz_friend_room_config_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a qzdz_friend_room_config_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns qzdz_friend_room_config_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): qzdz_friend_room_config_type;

    /**
     * Decodes a qzdz_friend_room_config_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns qzdz_friend_room_config_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): qzdz_friend_room_config_type;

    /**
     * Verifies a qzdz_friend_room_config_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a qzdz_friend_room_config_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns qzdz_friend_room_config_type
     */
    public static fromObject(object: { [k: string]: any }): qzdz_friend_room_config_type;

    /**
     * Creates a plain object from a qzdz_friend_room_config_type message. Also converts values to other types if specified.
     * @param message qzdz_friend_room_config_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: qzdz_friend_room_config_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this qzdz_friend_room_config_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** qzdz_friend_room_config_id enum. */
export enum qzdz_friend_room_config_id {
    room_type = 1,
    base_scores = 2,
    game_count = 3,
    feature = 4,
    enter_scores_multi = 5
}

/** user_cmd enum. */
export enum user_cmd {
    enterGameReq = 0,
    enterGameResp = 1,
    getUserInfoReq = 2,
    getUserInfoResp = 3,
    setUserInfoReq = 4,
    setUserInfoResp = 5,
    getLvAwardReq = 6,
    getLvAwardResp = 7,
    buyFundReq = 8,
    buyFundResp = 9,
    getFundAwardReq = 10,
    getFundAwardResp = 11,
    updateTokenPush = 12,
    updateUserInfoPush = 13,
    kickPush = 14,
    lvAwardInfoPush = 15,
    exchangeGuidePush = 27
}

/** Represents a msg_user_service */
export class msg_user_service extends $protobuf.rpc.Service {

    /**
     * Constructs a new msg_user_service service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new msg_user_service service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): msg_user_service;
}

/** Represents an enterGameReq. */
export class enterGameReq implements IenterGameReq {

    /**
     * Constructs a new enterGameReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IenterGameReq);

    /** enterGameReq gameId. */
    public gameId: (number|Long);

    /**
     * Creates a new enterGameReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns enterGameReq instance
     */
    public static create(properties?: IenterGameReq): enterGameReq;

    /**
     * Encodes the specified enterGameReq message. Does not implicitly {@link enterGameReq.verify|verify} messages.
     * @param message enterGameReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IenterGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified enterGameReq message, length delimited. Does not implicitly {@link enterGameReq.verify|verify} messages.
     * @param message enterGameReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IenterGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an enterGameReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns enterGameReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): enterGameReq;

    /**
     * Decodes an enterGameReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns enterGameReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): enterGameReq;

    /**
     * Verifies an enterGameReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an enterGameReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns enterGameReq
     */
    public static fromObject(object: { [k: string]: any }): enterGameReq;

    /**
     * Creates a plain object from an enterGameReq message. Also converts values to other types if specified.
     * @param message enterGameReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: enterGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this enterGameReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an enterGameResp. */
export class enterGameResp implements IenterGameResp {

    /**
     * Constructs a new enterGameResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IenterGameResp);

    /** enterGameResp isInFriendRoom. */
    public isInFriendRoom: boolean;

    /** enterGameResp roomId. */
    public roomId: number;

    /** enterGameResp roomType. */
    public roomType: number;

    /**
     * Creates a new enterGameResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns enterGameResp instance
     */
    public static create(properties?: IenterGameResp): enterGameResp;

    /**
     * Encodes the specified enterGameResp message. Does not implicitly {@link enterGameResp.verify|verify} messages.
     * @param message enterGameResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IenterGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified enterGameResp message, length delimited. Does not implicitly {@link enterGameResp.verify|verify} messages.
     * @param message enterGameResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IenterGameResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an enterGameResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns enterGameResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): enterGameResp;

    /**
     * Decodes an enterGameResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns enterGameResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): enterGameResp;

    /**
     * Verifies an enterGameResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an enterGameResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns enterGameResp
     */
    public static fromObject(object: { [k: string]: any }): enterGameResp;

    /**
     * Creates a plain object from an enterGameResp message. Also converts values to other types if specified.
     * @param message enterGameResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: enterGameResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this enterGameResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getUserInfoReq. */
export class getUserInfoReq implements IgetUserInfoReq {

    /**
     * Constructs a new getUserInfoReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetUserInfoReq);

    /** getUserInfoReq userId. */
    public userId: (number|Long);

    /**
     * Creates a new getUserInfoReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getUserInfoReq instance
     */
    public static create(properties?: IgetUserInfoReq): getUserInfoReq;

    /**
     * Encodes the specified getUserInfoReq message. Does not implicitly {@link getUserInfoReq.verify|verify} messages.
     * @param message getUserInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getUserInfoReq message, length delimited. Does not implicitly {@link getUserInfoReq.verify|verify} messages.
     * @param message getUserInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getUserInfoReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getUserInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getUserInfoReq;

    /**
     * Decodes a getUserInfoReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getUserInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getUserInfoReq;

    /**
     * Verifies a getUserInfoReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getUserInfoReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getUserInfoReq
     */
    public static fromObject(object: { [k: string]: any }): getUserInfoReq;

    /**
     * Creates a plain object from a getUserInfoReq message. Also converts values to other types if specified.
     * @param message getUserInfoReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getUserInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getUserInfoReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getUserInfoResp. */
export class getUserInfoResp implements IgetUserInfoResp {

    /**
     * Constructs a new getUserInfoResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetUserInfoResp);

    /** getUserInfoResp userInfo. */
    public userInfo: Iuser_info;

    /**
     * Creates a new getUserInfoResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getUserInfoResp instance
     */
    public static create(properties?: IgetUserInfoResp): getUserInfoResp;

    /**
     * Encodes the specified getUserInfoResp message. Does not implicitly {@link getUserInfoResp.verify|verify} messages.
     * @param message getUserInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetUserInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getUserInfoResp message, length delimited. Does not implicitly {@link getUserInfoResp.verify|verify} messages.
     * @param message getUserInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetUserInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getUserInfoResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getUserInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getUserInfoResp;

    /**
     * Decodes a getUserInfoResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getUserInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getUserInfoResp;

    /**
     * Verifies a getUserInfoResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getUserInfoResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getUserInfoResp
     */
    public static fromObject(object: { [k: string]: any }): getUserInfoResp;

    /**
     * Creates a plain object from a getUserInfoResp message. Also converts values to other types if specified.
     * @param message getUserInfoResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getUserInfoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getUserInfoResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a setUserInfoReq. */
export class setUserInfoReq implements IsetUserInfoReq {

    /**
     * Constructs a new setUserInfoReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IsetUserInfoReq);

    /** setUserInfoReq userKey. */
    public userKey: user_key_type;

    /** setUserInfoReq value. */
    public value: string;

    /**
     * Creates a new setUserInfoReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns setUserInfoReq instance
     */
    public static create(properties?: IsetUserInfoReq): setUserInfoReq;

    /**
     * Encodes the specified setUserInfoReq message. Does not implicitly {@link setUserInfoReq.verify|verify} messages.
     * @param message setUserInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IsetUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified setUserInfoReq message, length delimited. Does not implicitly {@link setUserInfoReq.verify|verify} messages.
     * @param message setUserInfoReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IsetUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a setUserInfoReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns setUserInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): setUserInfoReq;

    /**
     * Decodes a setUserInfoReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns setUserInfoReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): setUserInfoReq;

    /**
     * Verifies a setUserInfoReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a setUserInfoReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns setUserInfoReq
     */
    public static fromObject(object: { [k: string]: any }): setUserInfoReq;

    /**
     * Creates a plain object from a setUserInfoReq message. Also converts values to other types if specified.
     * @param message setUserInfoReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: setUserInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this setUserInfoReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a setUserInfoResp. */
export class setUserInfoResp implements IsetUserInfoResp {

    /**
     * Constructs a new setUserInfoResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IsetUserInfoResp);

    /**
     * Creates a new setUserInfoResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns setUserInfoResp instance
     */
    public static create(properties?: IsetUserInfoResp): setUserInfoResp;

    /**
     * Encodes the specified setUserInfoResp message. Does not implicitly {@link setUserInfoResp.verify|verify} messages.
     * @param message setUserInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IsetUserInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified setUserInfoResp message, length delimited. Does not implicitly {@link setUserInfoResp.verify|verify} messages.
     * @param message setUserInfoResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IsetUserInfoResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a setUserInfoResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns setUserInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): setUserInfoResp;

    /**
     * Decodes a setUserInfoResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns setUserInfoResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): setUserInfoResp;

    /**
     * Verifies a setUserInfoResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a setUserInfoResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns setUserInfoResp
     */
    public static fromObject(object: { [k: string]: any }): setUserInfoResp;

    /**
     * Creates a plain object from a setUserInfoResp message. Also converts values to other types if specified.
     * @param message setUserInfoResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: setUserInfoResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this setUserInfoResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getLvAwardReq. */
export class getLvAwardReq implements IgetLvAwardReq {

    /**
     * Constructs a new getLvAwardReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetLvAwardReq);

    /** getLvAwardReq lv. */
    public lv: number;

    /**
     * Creates a new getLvAwardReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getLvAwardReq instance
     */
    public static create(properties?: IgetLvAwardReq): getLvAwardReq;

    /**
     * Encodes the specified getLvAwardReq message. Does not implicitly {@link getLvAwardReq.verify|verify} messages.
     * @param message getLvAwardReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetLvAwardReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getLvAwardReq message, length delimited. Does not implicitly {@link getLvAwardReq.verify|verify} messages.
     * @param message getLvAwardReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetLvAwardReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getLvAwardReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getLvAwardReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getLvAwardReq;

    /**
     * Decodes a getLvAwardReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getLvAwardReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getLvAwardReq;

    /**
     * Verifies a getLvAwardReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getLvAwardReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getLvAwardReq
     */
    public static fromObject(object: { [k: string]: any }): getLvAwardReq;

    /**
     * Creates a plain object from a getLvAwardReq message. Also converts values to other types if specified.
     * @param message getLvAwardReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getLvAwardReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getLvAwardReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getLvAwardResp. */
export class getLvAwardResp implements IgetLvAwardResp {

    /**
     * Constructs a new getLvAwardResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetLvAwardResp);

    /** getLvAwardResp awardScores. */
    public awardScores: (number|Long);

    /** getLvAwardResp scores. */
    public scores: (number|Long);

    /** getLvAwardResp lvAward. */
    public lvAward: number[];

    /**
     * Creates a new getLvAwardResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getLvAwardResp instance
     */
    public static create(properties?: IgetLvAwardResp): getLvAwardResp;

    /**
     * Encodes the specified getLvAwardResp message. Does not implicitly {@link getLvAwardResp.verify|verify} messages.
     * @param message getLvAwardResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetLvAwardResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getLvAwardResp message, length delimited. Does not implicitly {@link getLvAwardResp.verify|verify} messages.
     * @param message getLvAwardResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetLvAwardResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getLvAwardResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getLvAwardResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getLvAwardResp;

    /**
     * Decodes a getLvAwardResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getLvAwardResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getLvAwardResp;

    /**
     * Verifies a getLvAwardResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getLvAwardResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getLvAwardResp
     */
    public static fromObject(object: { [k: string]: any }): getLvAwardResp;

    /**
     * Creates a plain object from a getLvAwardResp message. Also converts values to other types if specified.
     * @param message getLvAwardResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getLvAwardResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getLvAwardResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a buyFundReq. */
export class buyFundReq implements IbuyFundReq {

    /**
     * Constructs a new buyFundReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IbuyFundReq);

    /** buyFundReq type. */
    public type: fund_type;

    /**
     * Creates a new buyFundReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns buyFundReq instance
     */
    public static create(properties?: IbuyFundReq): buyFundReq;

    /**
     * Encodes the specified buyFundReq message. Does not implicitly {@link buyFundReq.verify|verify} messages.
     * @param message buyFundReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IbuyFundReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified buyFundReq message, length delimited. Does not implicitly {@link buyFundReq.verify|verify} messages.
     * @param message buyFundReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IbuyFundReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a buyFundReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns buyFundReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buyFundReq;

    /**
     * Decodes a buyFundReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns buyFundReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buyFundReq;

    /**
     * Verifies a buyFundReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a buyFundReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns buyFundReq
     */
    public static fromObject(object: { [k: string]: any }): buyFundReq;

    /**
     * Creates a plain object from a buyFundReq message. Also converts values to other types if specified.
     * @param message buyFundReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: buyFundReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this buyFundReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a buyFundResp. */
export class buyFundResp implements IbuyFundResp {

    /**
     * Constructs a new buyFundResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IbuyFundResp);

    /** buyFundResp type. */
    public type: fund_type;

    /** buyFundResp scores. */
    public scores: (number|Long);

    /** buyFundResp fundAward. */
    public fundAward: number[];

    /**
     * Creates a new buyFundResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns buyFundResp instance
     */
    public static create(properties?: IbuyFundResp): buyFundResp;

    /**
     * Encodes the specified buyFundResp message. Does not implicitly {@link buyFundResp.verify|verify} messages.
     * @param message buyFundResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IbuyFundResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified buyFundResp message, length delimited. Does not implicitly {@link buyFundResp.verify|verify} messages.
     * @param message buyFundResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IbuyFundResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a buyFundResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns buyFundResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buyFundResp;

    /**
     * Decodes a buyFundResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns buyFundResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buyFundResp;

    /**
     * Verifies a buyFundResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a buyFundResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns buyFundResp
     */
    public static fromObject(object: { [k: string]: any }): buyFundResp;

    /**
     * Creates a plain object from a buyFundResp message. Also converts values to other types if specified.
     * @param message buyFundResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: buyFundResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this buyFundResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getFundAwardReq. */
export class getFundAwardReq implements IgetFundAwardReq {

    /**
     * Constructs a new getFundAwardReq.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetFundAwardReq);

    /** getFundAwardReq lv. */
    public lv: number;

    /**
     * Creates a new getFundAwardReq instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getFundAwardReq instance
     */
    public static create(properties?: IgetFundAwardReq): getFundAwardReq;

    /**
     * Encodes the specified getFundAwardReq message. Does not implicitly {@link getFundAwardReq.verify|verify} messages.
     * @param message getFundAwardReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetFundAwardReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getFundAwardReq message, length delimited. Does not implicitly {@link getFundAwardReq.verify|verify} messages.
     * @param message getFundAwardReq message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetFundAwardReq, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getFundAwardReq message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getFundAwardReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getFundAwardReq;

    /**
     * Decodes a getFundAwardReq message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getFundAwardReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getFundAwardReq;

    /**
     * Verifies a getFundAwardReq message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getFundAwardReq message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getFundAwardReq
     */
    public static fromObject(object: { [k: string]: any }): getFundAwardReq;

    /**
     * Creates a plain object from a getFundAwardReq message. Also converts values to other types if specified.
     * @param message getFundAwardReq
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getFundAwardReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getFundAwardReq to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a getFundAwardResp. */
export class getFundAwardResp implements IgetFundAwardResp {

    /**
     * Constructs a new getFundAwardResp.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgetFundAwardResp);

    /** getFundAwardResp awardScores. */
    public awardScores: (number|Long);

    /** getFundAwardResp scores. */
    public scores: (number|Long);

    /** getFundAwardResp fundAward. */
    public fundAward: number[];

    /**
     * Creates a new getFundAwardResp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns getFundAwardResp instance
     */
    public static create(properties?: IgetFundAwardResp): getFundAwardResp;

    /**
     * Encodes the specified getFundAwardResp message. Does not implicitly {@link getFundAwardResp.verify|verify} messages.
     * @param message getFundAwardResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgetFundAwardResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified getFundAwardResp message, length delimited. Does not implicitly {@link getFundAwardResp.verify|verify} messages.
     * @param message getFundAwardResp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgetFundAwardResp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a getFundAwardResp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns getFundAwardResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): getFundAwardResp;

    /**
     * Decodes a getFundAwardResp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns getFundAwardResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): getFundAwardResp;

    /**
     * Verifies a getFundAwardResp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a getFundAwardResp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns getFundAwardResp
     */
    public static fromObject(object: { [k: string]: any }): getFundAwardResp;

    /**
     * Creates a plain object from a getFundAwardResp message. Also converts values to other types if specified.
     * @param message getFundAwardResp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: getFundAwardResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this getFundAwardResp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an updateTokenPush. */
export class updateTokenPush implements IupdateTokenPush {

    /**
     * Constructs a new updateTokenPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IupdateTokenPush);

    /** updateTokenPush reconnectToken. */
    public reconnectToken: string;

    /**
     * Creates a new updateTokenPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns updateTokenPush instance
     */
    public static create(properties?: IupdateTokenPush): updateTokenPush;

    /**
     * Encodes the specified updateTokenPush message. Does not implicitly {@link updateTokenPush.verify|verify} messages.
     * @param message updateTokenPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IupdateTokenPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified updateTokenPush message, length delimited. Does not implicitly {@link updateTokenPush.verify|verify} messages.
     * @param message updateTokenPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IupdateTokenPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an updateTokenPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns updateTokenPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): updateTokenPush;

    /**
     * Decodes an updateTokenPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns updateTokenPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): updateTokenPush;

    /**
     * Verifies an updateTokenPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an updateTokenPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns updateTokenPush
     */
    public static fromObject(object: { [k: string]: any }): updateTokenPush;

    /**
     * Creates a plain object from an updateTokenPush message. Also converts values to other types if specified.
     * @param message updateTokenPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: updateTokenPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this updateTokenPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an updateUserInfoPush. */
export class updateUserInfoPush implements IupdateUserInfoPush {

    /**
     * Constructs a new updateUserInfoPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IupdateUserInfoPush);

    /** updateUserInfoPush update. */
    public update: Iupdate_type[];

    /** updateUserInfoPush userInfo. */
    public userInfo: Iuser_info;

    /**
     * Creates a new updateUserInfoPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns updateUserInfoPush instance
     */
    public static create(properties?: IupdateUserInfoPush): updateUserInfoPush;

    /**
     * Encodes the specified updateUserInfoPush message. Does not implicitly {@link updateUserInfoPush.verify|verify} messages.
     * @param message updateUserInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IupdateUserInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified updateUserInfoPush message, length delimited. Does not implicitly {@link updateUserInfoPush.verify|verify} messages.
     * @param message updateUserInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IupdateUserInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an updateUserInfoPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns updateUserInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): updateUserInfoPush;

    /**
     * Decodes an updateUserInfoPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns updateUserInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): updateUserInfoPush;

    /**
     * Verifies an updateUserInfoPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an updateUserInfoPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns updateUserInfoPush
     */
    public static fromObject(object: { [k: string]: any }): updateUserInfoPush;

    /**
     * Creates a plain object from an updateUserInfoPush message. Also converts values to other types if specified.
     * @param message updateUserInfoPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: updateUserInfoPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this updateUserInfoPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a kickPush. */
export class kickPush implements IkickPush {

    /**
     * Constructs a new kickPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IkickPush);

    /** kickPush code. */
    public code: code_type;

    /** kickPush content. */
    public content: string;

    /** kickPush beginTime. */
    public beginTime: (number|Long);

    /** kickPush endTime. */
    public endTime: (number|Long);

    /**
     * Creates a new kickPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns kickPush instance
     */
    public static create(properties?: IkickPush): kickPush;

    /**
     * Encodes the specified kickPush message. Does not implicitly {@link kickPush.verify|verify} messages.
     * @param message kickPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IkickPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified kickPush message, length delimited. Does not implicitly {@link kickPush.verify|verify} messages.
     * @param message kickPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IkickPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a kickPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns kickPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kickPush;

    /**
     * Decodes a kickPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns kickPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kickPush;

    /**
     * Verifies a kickPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a kickPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns kickPush
     */
    public static fromObject(object: { [k: string]: any }): kickPush;

    /**
     * Creates a plain object from a kickPush message. Also converts values to other types if specified.
     * @param message kickPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: kickPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this kickPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a lvAwardInfoPush. */
export class lvAwardInfoPush implements IlvAwardInfoPush {

    /**
     * Constructs a new lvAwardInfoPush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IlvAwardInfoPush);

    /** lvAwardInfoPush curLv. */
    public curLv: number;

    /** lvAwardInfoPush awardScores. */
    public awardScores: (number|Long);

    /** lvAwardInfoPush scores. */
    public scores: (number|Long);

    /**
     * Creates a new lvAwardInfoPush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns lvAwardInfoPush instance
     */
    public static create(properties?: IlvAwardInfoPush): lvAwardInfoPush;

    /**
     * Encodes the specified lvAwardInfoPush message. Does not implicitly {@link lvAwardInfoPush.verify|verify} messages.
     * @param message lvAwardInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IlvAwardInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified lvAwardInfoPush message, length delimited. Does not implicitly {@link lvAwardInfoPush.verify|verify} messages.
     * @param message lvAwardInfoPush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IlvAwardInfoPush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a lvAwardInfoPush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns lvAwardInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): lvAwardInfoPush;

    /**
     * Decodes a lvAwardInfoPush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns lvAwardInfoPush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): lvAwardInfoPush;

    /**
     * Verifies a lvAwardInfoPush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a lvAwardInfoPush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns lvAwardInfoPush
     */
    public static fromObject(object: { [k: string]: any }): lvAwardInfoPush;

    /**
     * Creates a plain object from a lvAwardInfoPush message. Also converts values to other types if specified.
     * @param message lvAwardInfoPush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: lvAwardInfoPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this lvAwardInfoPush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an update_type. */
export class update_type implements Iupdate_type {

    /**
     * Constructs a new update_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iupdate_type);

    /** update_type key. */
    public key: update_param_type;

    /** update_type value. */
    public value: string;

    /**
     * Creates a new update_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns update_type instance
     */
    public static create(properties?: Iupdate_type): update_type;

    /**
     * Encodes the specified update_type message. Does not implicitly {@link update_type.verify|verify} messages.
     * @param message update_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iupdate_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified update_type message, length delimited. Does not implicitly {@link update_type.verify|verify} messages.
     * @param message update_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iupdate_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an update_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns update_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): update_type;

    /**
     * Decodes an update_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns update_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): update_type;

    /**
     * Verifies an update_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an update_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns update_type
     */
    public static fromObject(object: { [k: string]: any }): update_type;

    /**
     * Creates a plain object from an update_type message. Also converts values to other types if specified.
     * @param message update_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: update_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this update_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an exchangeGuidePush. */
export class exchangeGuidePush implements IexchangeGuidePush {

    /**
     * Constructs a new exchangeGuidePush.
     * @param [properties] Properties to set
     */
    constructor(properties?: IexchangeGuidePush);

    /** exchangeGuidePush val1. */
    public val1: (number|Long);

    /** exchangeGuidePush val2. */
    public val2: (number|Long);

    /**
     * Creates a new exchangeGuidePush instance using the specified properties.
     * @param [properties] Properties to set
     * @returns exchangeGuidePush instance
     */
    public static create(properties?: IexchangeGuidePush): exchangeGuidePush;

    /**
     * Encodes the specified exchangeGuidePush message. Does not implicitly {@link exchangeGuidePush.verify|verify} messages.
     * @param message exchangeGuidePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IexchangeGuidePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified exchangeGuidePush message, length delimited. Does not implicitly {@link exchangeGuidePush.verify|verify} messages.
     * @param message exchangeGuidePush message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IexchangeGuidePush, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an exchangeGuidePush message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns exchangeGuidePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): exchangeGuidePush;

    /**
     * Decodes an exchangeGuidePush message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns exchangeGuidePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): exchangeGuidePush;

    /**
     * Verifies an exchangeGuidePush message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an exchangeGuidePush message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns exchangeGuidePush
     */
    public static fromObject(object: { [k: string]: any }): exchangeGuidePush;

    /**
     * Creates a plain object from an exchangeGuidePush message. Also converts values to other types if specified.
     * @param message exchangeGuidePush
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: exchangeGuidePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this exchangeGuidePush to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a user_info. */
export class user_info implements Iuser_info {

    /**
     * Constructs a new user_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_info);

    /** user_info userId. */
    public userId: (number|Long);

    /** user_info userName. */
    public userName: string;

    /** user_info scores. */
    public scores: (number|Long);

    /** user_info lv. */
    public lv: number;

    /** user_info maxLv. */
    public maxLv: number;

    /** user_info exp. */
    public exp: (number|Long);

    /** user_info maxExp. */
    public maxExp: (number|Long);

    /** user_info avatar. */
    public avatar: number;

    /** user_info fundType. */
    public fundType: fund_type;

    /** user_info awardInfo. */
    public awardInfo?: (Iaward_type|null);

    /** user_info coinType. */
    public coinType: number;

    /** user_info snId. */
    public snId: (number|Long);

    /** user_info agentId. */
    public agentId: (number|Long);

    /** user_info coinRate. */
    public coinRate: number;

    /**
     * Creates a new user_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_info instance
     */
    public static create(properties?: Iuser_info): user_info;

    /**
     * Encodes the specified user_info message. Does not implicitly {@link user_info.verify|verify} messages.
     * @param message user_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_info message, length delimited. Does not implicitly {@link user_info.verify|verify} messages.
     * @param message user_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_info;

    /**
     * Decodes a user_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_info;

    /**
     * Verifies a user_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_info
     */
    public static fromObject(object: { [k: string]: any }): user_info;

    /**
     * Creates a plain object from a user_info message. Also converts values to other types if specified.
     * @param message user_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an award_type. */
export class award_type implements Iaward_type {

    /**
     * Constructs a new award_type.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iaward_type);

    /** award_type lvAward. */
    public lvAward: number[];

    /** award_type fundAward. */
    public fundAward: number[];

    /**
     * Creates a new award_type instance using the specified properties.
     * @param [properties] Properties to set
     * @returns award_type instance
     */
    public static create(properties?: Iaward_type): award_type;

    /**
     * Encodes the specified award_type message. Does not implicitly {@link award_type.verify|verify} messages.
     * @param message award_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iaward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified award_type message, length delimited. Does not implicitly {@link award_type.verify|verify} messages.
     * @param message award_type message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iaward_type, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an award_type message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns award_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): award_type;

    /**
     * Decodes an award_type message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns award_type
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): award_type;

    /**
     * Verifies an award_type message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an award_type message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns award_type
     */
    public static fromObject(object: { [k: string]: any }): award_type;

    /**
     * Creates a plain object from an award_type message. Also converts values to other types if specified.
     * @param message award_type
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: award_type, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this award_type to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** fund_type enum. */
export enum fund_type {
    fund_none = 0,
    fund_silver = 1,
    fund_gold = 2,
    fund_diamond = 3
}

/** user_key_type enum. */
export enum user_key_type {
    avatar = 1
}

/** update_param_type enum. */
export enum update_param_type {
    add_scores = 1,
    sub_scores = 2,
    lv = 3,
    exp = 4,
    active_cur_scores = 6
}

}