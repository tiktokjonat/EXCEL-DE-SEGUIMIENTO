export const config = {
  // El asterisco asegura que el bloqueo aplique a todas las páginas y rutas
  matcher: '/:path*',
};

export default function middleware(request) {
  // 1. Define aquí las IPs públicas autorizadas de tu empresa
  const ALLOWED_IPS = ['190.102.145.2', '161.132.182.178'];

  // 2. Captura la IP de la persona que intenta entrar
  const clientIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');

  // 3. Verifica si la IP visitante está en tu lista de permitidas
  if (!ALLOWED_IPS.includes(clientIp)) {
    // Si no está en la lista, rechaza la conexión con un error 403 (Prohibido)
    return new Response('Acceso Denegado. Esta plataforma es de uso exclusivo corporativo.', { 
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // Si la IP coincide, deja que la página cargue normalmente
  return fetch(request);
}
