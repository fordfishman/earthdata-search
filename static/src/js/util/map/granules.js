import projections from './projections'

function pairs(array) {
  const len = array.length

  const results = []
  for (let i = 0; i < len; i += 1) {
    results.push([array[i], array[(i + 1) % len]])
  }
  return results
}

// Is a given path clockwise?
export function isClockwise(path) {
  let sum = 0
  pairs(path).forEach(([p0, p1]) => {
    sum += (p1.x - p0.x) * (p1.y + p0.y)
  })
  return sum > 0
}

export function addPath(ctx, path) {
  let { poly } = path
  const { line } = path

  if ((poly != null) || (line != null)) {
    if (poly == null) { poly = line }
    const len = poly.length
    if (len < 2) { return }

    ctx.moveTo(poly[0].x, poly[0].y)
    poly.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    if (line == null) { ctx.closePath() }
  }
}

// Translate project types into 'epsg####' strings
export function getlprojection(options) {
  if (options.geographic) {
    return projections.geographic
  }
  if (options.arctic) {
    return projections.arctic
  }
  if (options.antarctic) {
    return projections.antarctic
  }
  return ''
}
