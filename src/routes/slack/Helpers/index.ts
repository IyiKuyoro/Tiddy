export function parseCommandBody(req: any, res: any, next: any) {
  let data = '{\"';

  req.on('data', (stream: string) => {
    data += stream;
  });

  req.on('end', () => {
    data = data.replace(/&/gi, '\",\"');
    data = data.replace(/=/gi, '\":\"');
    data += '\"}';

    req.body = JSON.parse(data);
    next();
  });
}
