function info() {
    return `This is the API of a Hackernews Clone`
}

function feed(parent, args, context) {
    return context.prisma.link.findMany()
}

module.exports = {
    info,
    feed,
}