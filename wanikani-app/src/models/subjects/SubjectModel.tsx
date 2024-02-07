interface Subject{
    id : number,
    auxiliary_meanings: Array<AuxiliaryMeaning>,
    characters : string | null,
    created_at : Date,
    document_url : String,
    hidden_at : null | Date,
    lesson_position : number,
    level : number,
    meaning_mnemonic : string,
    meanings : Array<Meaning>,
    slug : String,
    spaced_repetition_system_id : number

}

interface RadicalSubject extends Subject{
    amalgamation_subject_ids : Array<number>,
    character_images : Array<CharacterImage>
}

interface KanjiSubject extends Subject{
    amalgamation_subject_ids : Array<number>,
    component_subject_ids : Array<number>,
    meaning_hint : String,
    reading_hint : String,
    reading_mnemonic : String,
    readings : Array<Reading>,
    visually_similar_subject_ids : Array<number>
}


interface VocabularySubject extends Subject{
    component_subject_ids : Array<number>,
    context_sentences : Array<ContextSentence>,
    parts_of_speech : Array<string>,
    pronounciation_audios : Array<PronounciationAudio>,
    readings : Array<Reading>,
    reading_mnemonic : string
}

interface KanaVocabularySubject extends Subject {
    context_sentences : Array<ContextSentence>,
    meaning_mnemonic : string,
    parts_of_speech : Array<string>,
    pronounciation_audios : Array<PronounciationAudio>
}
