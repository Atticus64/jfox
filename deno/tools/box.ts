
export default async function box(title: string, steps: string[], padding: number) {
  return new Promise((res, rej) => {
    let maxLen = 0
    let boxAscii = ''
    let content = ''
    steps.map((p: string) => {

      if (maxLen < p.length) {
        maxLen = p.length
      }

    })

    const lines = steps.length
    const titleBox = ` ${title} `

    const width = maxLen
    let line = '─'.repeat(width - 6)
    line = '╭' + titleBox + line + '╮\n'
    let whiteLine = ' '.repeat(line.length - 3)
    let endLine = '─'.repeat(line.length - 3)
    steps.map((p: string) => {
      content += '│' + ' '.repeat(2) + p + ' '.repeat(endLine.length - p.length - 2) + '│\n'
    })
    endLine = '╰' + endLine + '╯'
    whiteLine = '│' + whiteLine + '│\n'
    boxAscii = line + whiteLine + content + whiteLine + endLine


    console.log(boxAscii)
    res(boxAscii)
  })
}



