const config = async (plop) => {
  plop.setGenerator('slide', {
    description: 'Generate Slide',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Slide name',
      },
      {
        type: 'rawlist',
        name: 'layout',
        message: 'Select layout',
        choices: [
          'default',
          'intro',
          'cover',
          'center',
          'image-left',
          'image-right',
          'image',
          'quote',
          'section',
          'statement',
          'two-cols',
        ],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'slides/{{name}}.md',
        templateFile: '.templates/slides/{{layout}}.hbs',
      },
      {
        type: 'modify',
        path: 'slides.md',
        transform(fileData, data) {
          const slideName = plop.renderString(data.fileName, data)
          const newSlide = `---\nsrc: ./slides/${slideName}.md\n---\n`
          const newFile = `${fileData}\n${newSlide}`

          return newFile
        },
        data: {
          fileName: '{{name}}',
        },
      },
    ],
  })

  plop.setGenerator('component', {
    description: 'Generate Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase name}}.vue',
        templateFile: '.templates/components/base.hbs',
      },
    ],
  })
}

module.exports = config
