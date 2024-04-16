export const GET = async (request: Request) => {
  return new Response(JSON.stringify({ root: true }))
}
