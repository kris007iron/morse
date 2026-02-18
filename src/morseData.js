export async function loadMorseData()
{
    const respone = await fetch('./morse-code.json')
    const data = await respone.json()
    return data.morsecode
}