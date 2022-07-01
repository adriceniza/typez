import { getSession } from 'next-auth/react'
export default async function updInputBefore() {
    const fake_input = document.getElementById("fake_input");
    let user: any = await getSession().then(session => user = session?.user)
    if (user && user?.name !== undefined) {
        fake_input?.setAttribute('data-before', (user?.username).split(" ")[0] + `@typez:~$`)
    } else {
        fake_input?.setAttribute('data-before', 'guest@typez:~$')
    }
    return { "status": "success" }
}
