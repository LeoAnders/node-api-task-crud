import http from 'http'

const task = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(task))
  }

  if (method === 'PUT' && url === '/tasks') {
    const { title, description } = req.body;

    task.push(
      {
        "id": 1,
        "title": title,
        "description": description,
        "completed_at": null,
        "created_at": "2024-11-01T10:00:00Z",
        "updated_at": "2024-11-01T10:00:00Z"
      },
    )

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)