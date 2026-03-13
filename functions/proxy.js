export async function onRequestPost(context) {
  try {
    const { target, body } = await context.request.json();

    const allowed = [
      'https://my.etmsolutionsusa.com',
      'https://apolloeld.com',
      'https://livetrack.atcompass.net',
    ];
    if (!allowed.some(a => target.startsWith(a))) {
      return Response.json({ error: 'Target not allowed' }, { status: 403 });
    }

    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));
    return Response.json(data);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
