module.exports = ({width, height, data, max = Math.max(...data.map(point => Object.entries(point)[0][1])), offsetFromLeft = 40, offsetFromBottom = 40, offsetFromTop = 40, ySteps = max, xSteps = 10}) =>
`<?xml version="1.0" encoding="utf-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M ${offsetFromLeft} ${height - offsetFromBottom} ${data.map((point, index) => `L ${index * (width - offsetFromLeft) / data.length + offsetFromLeft} ${height - offsetFromTop - offsetFromBottom - Object.entries(point)[0][1] / max * (height - offsetFromBottom - offsetFromTop) + offsetFromTop}`).join(' ')} L ${width} ${height - offsetFromBottom} L ${offsetFromLeft} ${height - offsetFromBottom}" stroke="red" fill="transparent"/>
    <path d="M ${offsetFromLeft - 1} ${offsetFromTop} L ${offsetFromLeft - 1} ${height - offsetFromBottom}" stroke="red" fill="transparent"/>
    ${[...Array(ySteps + 1).keys()].map(i => `<text x="${offsetFromLeft - 30}" y="${(height - offsetFromBottom) - (height - offsetFromTop - offsetFromBottom) / ySteps * i}">${max / ySteps * i}</text>`).join('')}
    <text x="10" y="10">nb occurences</text>
    ${[...Array(xSteps + 1).keys()].map(i => `<text x="${offsetFromLeft + (width - offsetFromLeft) / xSteps * i}" y="${height - offsetFromBottom + 20}">${new Date(parseInt(Object.entries(data[Math.ceil(data.length / xSteps * i)]||[[0]])[0][0])).toLocaleTimeString('fr-FR')}</text>`).join('')}}
    <text x="${width - 50}" y="${height}">heure</text>
  </g>
</svg>`