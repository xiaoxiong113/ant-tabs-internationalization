/*
 * @description: 
 * @author: xiaoxiong
 * @lastEditors: xiaoxiong
 * @Date: 2020-07-15 17:43:05
 */ 
/**
 * 画一整条线
 * @param ctx
 * @param points
 * @param color
 * @param width
 * @param lineJoin
 * @param lineCap
 */
export function drawLine(ctx: any, points: any, color: any, width: any, lineJoin = 'miter', lineCap = 'round') {
  if (points.length >= 2) {
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.lineCap = lineCap
    ctx.lineJoin = lineJoin
    ctx.beginPath()
    if (points.length === 2) {
      ctx.arc(points[0], points[1], width, 0, Math.PI * 2)
    } else {
      if (points.length > 4) {
        ctx.moveTo(points[0], points[1])
        for (let i = 2; i < points.length - 4; i += 2) {
          ctx.quadraticCurveTo(points[i], points[i + 1], (points[i] + points[i + 2]) / 2, (points[i + 1] + points[i + 3]) / 2)
        }
        ctx.lineTo(points[points.length - 2], points[points.length - 1])
      } else {
        ctx.moveTo(points[0], points[1])
        ctx.lineTo(points[2], points[3])
      }
    }
    ctx.stroke()
    ctx.closePath()
  }
}

/**
 * 画一个点，根据之前已经存在的线做优化
 * @param ctx
 * @param point
 * @param prevPoints
 * @param color
 * @param width
 * @param lineJoin
 * @param lineCap
 */
export function drawPoint({ctx, point, prevPoints, color, width, lineJoin = 'miter', lineCap = 'round'}: any) {
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.lineCap = lineCap
  ctx.lineJoin = lineJoin
  const prevPointsLength = prevPoints.length
  if (prevPointsLength === 0) { // 画一个点
    ctx.arc(point[0], point[1], width, 0, Math.PI * 2)
  } else if (prevPointsLength === 2) { // 开始划线
    ctx.beginPath()
    ctx.moveTo(...point)
  } else { // 继续划线
    ctx.lineTo(...point)
  }
  ctx.stroke()
}

/**
 * 画一组线，支持半透明划线，每次更新会清除所有划线后重画一下
 * @param ctx
 * @param lines 二维数组，元素是划线点组成的数组， eg [[1,2,3,4],[1,2,3,4,5,6],...]
 * @param color
 * @param width
 * @param lineJoin
 * @param lineCap
 * @param canvasWith
 * @param canvasHeight
 */
export function drawOpacityLines({ctx, lines, canvasWith = 10000, canvasHeight = 10000}: any) {
  ctx.clearRect(0, 0, canvasWith, canvasHeight)

  for (let i = 0; i < lines.length; i += 1) {
    const {
      points,
      color,
      width,
      lineJoin,
      lineCap,
    } = lines[i]
    const pointsLength = points.length

    if (pointsLength > 2) {
      ctx.strokeStyle = color
      ctx.lineCap = lineCap
      ctx.lineJoin = lineJoin
      ctx.lineWidth = width
      ctx.beginPath()

      if (pointsLength > 4) {
        ctx.moveTo(points[0], points[1])
        for (let j = 2; j < pointsLength - 4; j += 2) {
          ctx.quadraticCurveTo(points[j], points[j + 1], (points[j] + points[j + 2]) / 2, (points[j + 1] + points[j + 3]) / 2)
        }
        ctx.lineTo(points[pointsLength - 2], points[pointsLength - 1])
      } else {
        ctx.moveTo(points[0], points[1])
        ctx.lineTo(points[2], points[3])
      }

      ctx.stroke()
      ctx.closePath()
    }
  }
}

/**
 * 擦除路径
 * @param ctx
 * @param {Array} points
 * @param width
 */
export function clearPath({ctx, points, width}: any) {
  const pointsLength = points.length
  if (pointsLength > 0) {
    ctx.beginPath()
    ctx.globalCompositeOperation = 'destination-out'

    if (pointsLength === 2) { // 一个点
      ctx.arc(points[0], points[1], width / 2, 0, 2 * Math.PI)
      ctx.fill()
    } else if (pointsLength >= 4) {
      ctx.lineWidth = width
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.moveTo(points[0], points[1])
      for (let j = 2; j <= pointsLength - 2; j += 2) {
        ctx.lineTo(points[j], points[j + 1])
      }
      ctx.stroke()
    }
    ctx.closePath()
    ctx.globalCompositeOperation = 'source-over'
  }
}

/**
 * 写字
 * @param {object} textInfo
 * @param textInfo.canvasContext
 * @param textInfo.text
 * @param textInfo.color
 * @param textInfo.fontSize
 * @param textInfo.x
 * @param textInfo.y
 */
export function drawText(
  {
    canvasContext,
    text,
    color,
    fontSize,
    x,
    y,
  }: any,
) {
  canvasContext.font = `normal normal ${fontSize}px Airal`
  canvasContext.fillStyle = color
  canvasContext.textBaseline = 'middle'
  canvasContext.fillText(text, x, y)
}

/**
 * 写字，超出canvas右侧边缘自动换行
 * @param {object} textInfo
 * @param textInfo.canvasContext
 * @param textInfo.text
 * @param textInfo.color
 * @param textInfo.fontSize
 * @param textInfo.x
 * @param textInfo.y
 */
export function drawWrapText(
  {
    canvasContext,
    text,
    color,
    fontSize,
    x,
    y,
  }: any,
) {
  if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
    return
  }
  const canvasWidth = canvasContext.canvas.width
  canvasContext.font = `normal normal ${fontSize}px sans-serif`
  canvasContext.fillStyle = color
  canvasContext.textBaseline = 'middle'

  // 字符分隔为数组
  const arrText = text.split('')
  let line = ''

  let calcY = y
  for (let n = 0; n < arrText.length; n += 1) {
    const testLine = line + arrText[n]
    const metrics = canvasContext.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > canvasWidth - x && n > 0) {
      canvasContext.fillText(line, x, calcY)
      line = arrText[n]
      calcY += fontSize
    } else {
      line = testLine
    }
  }
  canvasContext.fillText(line, x, calcY)
}

/**
 * 画形状
 * @param {object} shapeInfo
 * @param shapeInfo.writingCtx
 * @param shapeInfo.type
 * @param shapeInfo.color
 * @param shapeInfo.width
 * @param shapeInfo.positionX
 * @param shapeInfo.positionY
 * @param shapeInfo.dataX
 * @param shapeInfo.dataY
 */
export function drawShape(
  {
    writingCtx,
    type,
    color,
    width,
    positionX,
    positionY,
    dataX,
    dataY,
  }: any,
) {
  writingCtx.lineWidth = width
  writingCtx.strokeStyle = color
  if (type === 'square') {
    writingCtx.beginPath()
    writingCtx.strokeRect(positionX, positionY, dataX, dataY)
  }
  if (type === 'circle') {
    writingCtx.beginPath()
    writingCtx.ellipse(positionX, positionY, dataX, dataY, 0, 0, Math.PI * 2)
    writingCtx.stroke()
  }
}