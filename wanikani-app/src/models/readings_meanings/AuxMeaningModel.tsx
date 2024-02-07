interface AuxiliaryMeaning {
    meaning : string,
    type: AuxiliaryMeaningType
}

enum AuxiliaryMeaningType{
    whitelist = "whitelist",
    blacklist = "blacklist"
}
