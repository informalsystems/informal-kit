import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeNetworksFields {
    title: EntryFieldTypes.Symbol;
    logo: EntryFieldTypes.AssetLink;
    logoBackground: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    delegationURL?: EntryFieldTypes.Symbol;
    tokenName: EntryFieldTypes.Symbol;
    tokenDescription?: EntryFieldTypes.Text;
    chainTitle?: EntryFieldTypes.Symbol;
    chainDescription?: EntryFieldTypes.Text;
    commission?: EntryFieldTypes.Number;
    selfDelegated?: EntryFieldTypes.Number;
    totalDelegated?: EntryFieldTypes.Number;
    uptime?: EntryFieldTypes.Number;
    twitterUsername?: EntryFieldTypes.Symbol;
    websiteURL?: EntryFieldTypes.Symbol;
    blockExplorerURL?: EntryFieldTypes.Symbol;
}

export type TypeNetworksSkeleton = EntrySkeletonType<TypeNetworksFields, "networks">;
export type TypeNetworks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNetworksSkeleton, Modifiers, Locales>;
