(async () => {
    const octo = require("octokit")
    const fs = require("fs")

    const name = "kafka"
    const repo = "apache/kafka"
    const mainLine = "trunk"
    const start = "2022-01-01"
    const end = "2022-06-30"
    const startPage = 1;
    const queryString = `repo:${repo} is:pr base:${mainLine} created:>=${start} merged:<=${end}`
    const url = `/search/issues`

    // Add your GitHub credentials here
    const octokit = new octo.Octokit({
        // auth: ''
    })

    const items = []

    let page = startPage;
    try {
        while(true) {
            console.log(`Fetching page ${page}`)

            const res = await octokit.request(`GET ${url}`, {
                q: queryString,
                per_page: 100,
                page: page
            }) 

            if (res.data.items.length === 0) {
                break
            }

            console.log(`Fetched page ${page++} / ${res.data.total_count}`)

            items.push(...res.data.items.map(pr => ({
                created_at: pr.created_at,
                merged_at: pr.pull_request.merged_at,
            })))
        }
    } catch (err) {
        // if we hit the rate limit, log the last page so we can continue later
        console.log(`An error was encountered, last attempted page: ${page}`)
        console.log(err)
    } finally {
        fs.writeFile(`../data/${name}.json`, JSON.stringify(items), (err) => {
            if (err) {
               console.log(err) 
            }
        })
    }
})()