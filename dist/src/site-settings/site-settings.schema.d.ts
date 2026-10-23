import { Document } from 'mongoose';
export type SiteSettingsDocument = SiteSettings & Document;
export declare class MetricItem {
    value: string;
    label: string;
}
export declare const MetricItemSchema: import("mongoose").Schema<MetricItem, import("mongoose").Model<MetricItem, any, any, any, any, any, MetricItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MetricItem, Document<unknown, {}, MetricItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<MetricItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    value?: import("mongoose").SchemaDefinitionProperty<string, MetricItem, Document<unknown, {}, MetricItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MetricItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    label?: import("mongoose").SchemaDefinitionProperty<string, MetricItem, Document<unknown, {}, MetricItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MetricItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, MetricItem>;
export declare class StatsConfig {
    enabled: boolean;
    title: string;
    metrics: MetricItem[];
}
export declare const StatsConfigSchema: import("mongoose").Schema<StatsConfig, import("mongoose").Model<StatsConfig, any, any, any, any, any, StatsConfig>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StatsConfig, Document<unknown, {}, StatsConfig, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<StatsConfig & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    enabled?: import("mongoose").SchemaDefinitionProperty<boolean, StatsConfig, Document<unknown, {}, StatsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, StatsConfig, Document<unknown, {}, StatsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    metrics?: import("mongoose").SchemaDefinitionProperty<MetricItem[], StatsConfig, Document<unknown, {}, StatsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StatsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, StatsConfig>;
export declare class SectionsConfig {
    stats: boolean;
    articles: boolean;
    testimonials: boolean;
    mentorship: boolean;
    career: boolean;
    events: boolean;
    pricing: boolean;
    cvUploadMandatory: boolean;
}
export declare const SectionsConfigSchema: import("mongoose").Schema<SectionsConfig, import("mongoose").Model<SectionsConfig, any, any, any, any, any, SectionsConfig>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SectionsConfig, Document<unknown, {}, SectionsConfig, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    stats?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    articles?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    testimonials?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    mentorship?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    career?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    events?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    pricing?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    cvUploadMandatory?: import("mongoose").SchemaDefinitionProperty<boolean, SectionsConfig, Document<unknown, {}, SectionsConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SectionsConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, SectionsConfig>;
export declare class SiteSettings {
    platform: string;
    stats: StatsConfig;
    sections: SectionsConfig;
    customConfig: Record<string, any>;
}
export declare const SiteSettingsSchema: import("mongoose").Schema<SiteSettings, import("mongoose").Model<SiteSettings, any, any, any, any, any, SiteSettings>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SiteSettings, Document<unknown, {}, SiteSettings, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<SiteSettings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    platform?: import("mongoose").SchemaDefinitionProperty<string, SiteSettings, Document<unknown, {}, SiteSettings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SiteSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    stats?: import("mongoose").SchemaDefinitionProperty<StatsConfig, SiteSettings, Document<unknown, {}, SiteSettings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SiteSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    sections?: import("mongoose").SchemaDefinitionProperty<SectionsConfig, SiteSettings, Document<unknown, {}, SiteSettings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SiteSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    customConfig?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, SiteSettings, Document<unknown, {}, SiteSettings, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SiteSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, SiteSettings>;
