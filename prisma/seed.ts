import { PrismaClient, TaskStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function createContentWithTasks(
  divisionId: string,
  title: string,
  tasks: {
    title: string
    status?: TaskStatus
  }[],
  position = 0,
) {
  const content = await prisma.content.create({
    data: {
      title,
      divisionId,
      position,
    },
  })

  await prisma.task.createMany({
    data: tasks.map((task, index) => ({
      title: task.title,
      status: task.status ?? TaskStatus.BACKLOG,
      position: index,
      contentId: content.id,
    })),
  })

  return content
}

async function main() {
  console.log('🌱 Seeding database...')

  const user = await prisma.user.create({
    data: {
      name: 'Filipe',
      email: 'filipe@email.com',
      password: 'seed-password',
    },
  })

  // =========================
  // ENEM 2026
  // =========================

  const enem = await prisma.goal.create({
    data: {
      title: 'ENEM 2026',
      userId: user.id,
    },
  })

  const subjects = [
    'Matemática',
    'Física',
    'Química',
    'Biologia',
    'História',
    'Geografia',
    'Filosofia',
    'Sociologia',
    'Linguagens',
    'Literatura',
    'Gramática',
    'Redação',
  ]

  const subjectMap = new Map<string, string>()

  for (const name of subjects) {
    const subject = await prisma.subject.create({
      data: {
        name,
        goalId: enem.id,
      },
    })
    const division = await prisma.division.create({
      data: {
        name: 'Frente Única',
        subjectId: subject.id,
      },
    })

    subjectMap.set(name, division.id)
  }

  // Matemática

  await createContentWithTasks(subjectMap.get('Matemática')!, 'Funções', [
    { title: 'Plano Cartesiano', status: TaskStatus.DONE },
    { title: 'Função Afim', status: TaskStatus.DONE },
    { title: 'Função Quadrática', status: TaskStatus.TODAY },
    { title: 'Tipos de Parábola' },
  ])

  await createContentWithTasks(subjectMap.get('Matemática')!, 'Equações', [
    { title: 'Equação do 1º Grau' },
    { title: 'Equação do 2º Grau' },
    { title: 'Sistemas Lineares' },
  ])

  await createContentWithTasks(subjectMap.get('Matemática')!, 'Trigonometria', [
    { title: 'Seno' },
    { title: 'Cosseno' },
    { title: 'Tangente' },
    { title: 'Ciclo Trigonométrico' },
  ])

  await createContentWithTasks(subjectMap.get('Matemática')!, 'Geometria', [
    { title: 'Área' },
    { title: 'Perímetro' },
    { title: 'Teorema de Pitágoras' },
    { title: 'Polígonos' },
  ])

  // Física

  await createContentWithTasks(subjectMap.get('Física')!, 'Cinemática', [
    { title: 'MRU' },
    { title: 'MRUV' },
    { title: 'Queda Livre' },
  ])

  await createContentWithTasks(subjectMap.get('Física')!, 'Dinâmica', [
    { title: 'Leis de Newton' },
    { title: 'Atrito' },
    { title: 'Plano Inclinado' },
  ])

  await createContentWithTasks(subjectMap.get('Física')!, 'Termologia', [
    { title: 'Calor' },
    { title: 'Temperatura' },
    { title: 'Dilatação' },
  ])

  // Química

  await createContentWithTasks(subjectMap.get('Química')!, 'Química Geral', [
    { title: 'Átomos' },
    { title: 'Tabela Periódica' },
    { title: 'Ligações Químicas' },
  ])

  await createContentWithTasks(subjectMap.get('Química')!, 'Físico-Química', [
    { title: 'Molaridade' },
    { title: 'Estequiometria' },
    { title: 'Soluções' },
  ])

  await createContentWithTasks(subjectMap.get('Química')!, 'Química Orgânica', [
    { title: 'Hidrocarbonetos' },
    { title: 'Funções Orgânicas' },
    { title: 'Polímeros' },
  ])

  // Biologia

  await createContentWithTasks(subjectMap.get('Biologia')!, 'Citologia', [
    { title: 'Membrana Celular' },
    { title: 'Organelas' },
    { title: 'Mitose' },
  ])

  await createContentWithTasks(subjectMap.get('Biologia')!, 'Genética', [
    { title: 'Leis de Mendel' },
    { title: 'DNA' },
    { title: 'RNA' },
  ])

  await createContentWithTasks(subjectMap.get('Biologia')!, 'Ecologia', [
    { title: 'Cadeias Alimentares' },
    { title: 'Biomas' },
    { title: 'Impactos Ambientais' },
  ])

  // História

  await createContentWithTasks(
    subjectMap.get('História')!,
    'História do Brasil',
    [
      { title: 'Brasil Colônia' },
      { title: 'Brasil Império' },
      { title: 'República Velha' },
    ],
  )

  // Geografia

  await createContentWithTasks(subjectMap.get('Geografia')!, 'Geopolítica', [
    { title: 'Globalização' },
    { title: 'Blocos Econômicos' },
    { title: 'Conflitos Mundiais' },
  ])

  // Filosofia

  await createContentWithTasks(
    subjectMap.get('Filosofia')!,
    'Filosofia Antiga',
    [{ title: 'Sócrates' }, { title: 'Platão' }, { title: 'Aristóteles' }],
  )

  // Sociologia

  await createContentWithTasks(subjectMap.get('Sociologia')!, 'Cultura', [
    { title: 'Cultura de Massa' },
    { title: 'Identidade Cultural' },
    { title: 'Diversidade Cultural' },
  ])

  // Linguagens

  await createContentWithTasks(
    subjectMap.get('Linguagens')!,
    'Interpretação de Texto',
    [{ title: 'Inferência' }, { title: 'Coesão' }, { title: 'Coerência' }],
  )

  // Literatura

  await createContentWithTasks(subjectMap.get('Literatura')!, 'Modernismo', [
    { title: 'Semana de 22' },
    { title: 'Primeira Fase' },
    { title: 'Segunda Fase' },
  ])

  // Gramática

  await createContentWithTasks(subjectMap.get('Gramática')!, 'Sintaxe', [
    { title: 'Período Simples' },
    { title: 'Período Composto' },
    { title: 'Orações Subordinadas' },
  ])

  // Redação

  await createContentWithTasks(
    subjectMap.get('Redação')!,
    'Competências ENEM',
    [
      { title: 'Competência 1' },
      { title: 'Competência 2' },
      { title: 'Competência 3' },
      { title: 'Competência 4' },
      { title: 'Competência 5' },
    ],
  )

  // =========================
  // TJ-SP
  // =========================

  const tjsp = await prisma.goal.create({
    data: {
      title: 'TJ-SP Escrevente',
      userId: user.id,
    },
  })

  const portugues = await prisma.subject.create({
    data: {
      name: 'Português',
      goalId: tjsp.id,
    },
  })

  const division = await prisma.division.create({
    data: {
      name: 'Frente Única',
      subjectId: portugues.id,
    },
  })

  await createContentWithTasks(division.id, 'Interpretação', [
    { title: 'Compreensão Textual' },
    { title: 'Tipologia Textual' },
    { title: 'Semântica' },
  ])

  console.log('✅ Seed finished')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
