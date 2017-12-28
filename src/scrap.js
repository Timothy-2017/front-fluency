const english_article_description = "These 17 companies all struggled in 2017. Many of them closed stores, and some have even filed for bankruptcy at least once before."
const translated_article = "These 17 companies todo struggled en 2017 muchos de ellos cerrado stores y algunos tener incluso filed para quiebra en menos once antes"

english_article_description.split(' ').length

const newArticle = []
const english_article_description_array = english_article_description.split(' ')
const translated_article_array = translated_article.split(' ')

english_article_description_array.forEach((word, i) => {
  if (word !== translated_article_array[i]) {
    newArticle.push(translated_article_array[i])
  }
})

// newArticle
