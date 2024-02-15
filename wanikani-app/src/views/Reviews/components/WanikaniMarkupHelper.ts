export default function wanikaniMarkupToHtml(content : string)  {
  const mnemonicStyle = {
    kanji : "color:white; background-color: #DF37A7;",
    vocabulary: "color:white; background-color: #5a06ea;",
    radical: "color:white; background-color: #00AAFF;",
    reading: "color:white; background-color: #484848;",
    meaning: "color:white; background-color: #484848;",
  }
  const ret =  content
  .replace(/<kanji>/gm, "<span style='"+ mnemonicStyle.kanji+"'>").replace(/<\/kanji>/gm, "</span>")
  .replace(/<radical>/gm,  "<span style='"+ mnemonicStyle.radical+"'>").replace(/<\/radical>/gm, "</span>")
  .replace(/<vocabulary>/gm,  "<span style='"+ mnemonicStyle.vocabulary+"'>").replace(/<\/vocabulary>/gm, "</span>")
  .replace(/<meaning>/gm, "<span style='"+ mnemonicStyle.meaning+"'>").replace(/<\/meaning>/gm, "</span>")
  .replace(/<reading>/gm, "<span style='"+ mnemonicStyle.reading+"'>").replace(/<\/reading>/gm, "</span>")
  .replace(/<ja>/gm, "")
  .replace(/<\/ja>/gm, "")
  .replace(/<en>/gm, "")
  .replace(/<\/en>/gm, "")
  return ret
}
