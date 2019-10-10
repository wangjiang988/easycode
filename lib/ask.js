const async = require('async')
const inquirer = require('inquirer')
const StringUtils = require('./util/stringUtils')
// const evaluate = require('./eval')

// Support types from prompt-for which was used before
const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}

/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */

async function ask(prompts) {
  return await prompt(prompts)
}

/**
 * 询问是否继续
 */
async function askIfContinue(message) {
  const continueQuestion = {
    type: 'confirm',
    name: 'isContinue',
    message: message ? message : '是否继续',
    default: 'Y'
  }
  const ret = await getPrompt(continueQuestion)
  return ret['isContinue']
}

/**
 * 询问一个问题, 返回填入的字符串
 */
async function askAQuestion(message, deafultAns) {
  const continueQuestion = {
    type: 'input',
    name: 'question',
    message: message || '问题:',
    default: deafultAns || ''
  }
  const ret = await getPrompt(continueQuestion)
  return ret['question']
}

/**
 * 循环询问一组问题
 * @param {*} prompts 
 */

async function muilpulAsk(title, questions) {
  console.log('******  ' + title + '  *******')
  const continueQuestion = {
    type: 'confirm',
    name: 'isContinue',
    message: '是否继续',
    default: 'Y'
  }
  let answers = []
  let stopLoop = false
  while (!stopLoop) {
    let answer = await prompt(questions)
    const ret = await getPrompt(continueQuestion)
    stopLoop = !ret['isContinue']
    answers.push(answer)
  }

  return answers
}

/**
 * Inquirer prompt wrapper.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Object} prompt
 * @param {Function} done
 */

async function prompt(prompts) {
  let metadata = {}
  if (prompts.length > 0) {
    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i]
      const data = await getPrompt(prompt)
      Object.assign(metadata, data)
    }
  }
  return metadata
}

async function getPrompt(prompt) {
  let data = []
  const key = prompt.name
  return new Promise((res, rej) => {
    inquirer.prompt([{
      type: promptMapping[prompt.type] || prompt.type,
      name: key,
      message: prompt.message || prompt.label || prompt.description || key,
      default: prompt.default || '',
      choices: prompt.choices || [],
      validate: prompt.validate || (() => true)
    }]).then(answers => {
      if (Array.isArray(answers[key])) {
        data[prompt.name] = {}
        answers[key].forEach(multiChoiceAnswer => {
          data[prompt.name] = multiChoiceAnswer
        })
      } else if (typeof answers[key] === 'string') {
        data[prompt.name] = answers[key].replace(/"/g, '\\"')
      } else {
        data[prompt.name] = answers[key]
      }
      res(data)
    }).catch(err => {
      rej(err)
    })
  })
}

module.exports = {
  ask,
  askIfContinue,
  askAQuestion,
  muilpulAsk
}
