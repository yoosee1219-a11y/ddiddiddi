export const isTossBuild = import.meta.env['VITE_APPS_IN_TOSS'] === 'true'

export class PlatformError extends Error {
  readonly name = 'PlatformError'
  constructor(readonly reason: 'unsupported' | 'cancelled' | 'failed', cause?: unknown) {
    super(`Platform action ${reason}`, { cause })
  }
}

export function actionMessage(error: unknown): string {
  if (error instanceof Error && error.name === 'AbortError') return '취소했어요.'
  if (error instanceof PlatformError && error.reason === 'unsupported') {
    return '이 환경에서는 지원하지 않아요. 토스 앱을 최신 버전으로 업데이트해 주세요.'
  }
  return '완료하지 못했어요. 잠시 뒤 다시 시도해 주세요.'
}

export async function saveImage(dataUrl: string, fileName: string): Promise<void> {
  if (isTossBuild) {
    const { File: TossFile } = await import('@apps-in-toss/web-framework')
    if (!TossFile.saveBase64.isSupported()) throw new PlatformError('unsupported')
    const prefix = 'data:image/png;base64,'
    if (!dataUrl.startsWith(prefix)) throw new PlatformError('failed')
    await TossFile.saveBase64({ data: dataUrl.slice(prefix.length), fileName, mimeType: 'image/png' })
    return
  }
  const anchor = document.createElement('a')
  anchor.href = dataUrl
  anchor.download = fileName
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
}

export async function shareResult(file: File, text: string): Promise<'shared' | 'copied'> {
  if (isTossBuild) {
    const { Share } = await import('@apps-in-toss/web-framework')
    const link = await Share.createLink({ path: 'intoss://ddiddiddi' })
    await Share.sendMessage({ message: `${text}
${link}` })
    return 'shared'
  }
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: '오늘의 띠 캐릭터', text })
    return 'shared'
  }
  await navigator.clipboard.writeText(text)
  return 'copied'
}

export async function currentCoordinates(): Promise<{ readonly latitude: number; readonly longitude: number }> {
  if (isTossBuild) {
    const { Device, Accuracy } = await import('@apps-in-toss/web-framework')
    const result = await Device.getLocation({ accuracy: Accuracy.Balanced })
    return result.coords
  }
  if (!navigator.geolocation) throw new PlatformError('unsupported')
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve(coords), reject, { timeout: 8000, maximumAge: 60000 },
  ))
}

export async function configureNavigation(
  onBack: () => boolean,
  onFailure: (message: string) => void,
): Promise<void> {
  if (!isTossBuild) return
  try {
    const { graniteEvent, Screen } = await import('@apps-in-toss/web-framework')
    const unsubscribe = graniteEvent.addEventListener('backEvent', {
      onEvent: () => {
        if (!onBack()) void Screen.close().catch((error: unknown) => onFailure(actionMessage(error)))
      },
      onError: (error) => onFailure(actionMessage(error)),
    })
    window.addEventListener('pagehide', unsubscribe, { once: true })
  } catch (error: unknown) {
    onFailure(actionMessage(error))
  }
}

export async function updateBackButton(visible: boolean): Promise<void> {
  if (!isTossBuild) return
  try {
    const { NavigationBar } = await import('@apps-in-toss/web-framework')
    await NavigationBar.setOptions({ withBackButton: visible })
  } catch (error: unknown) {
    if (!(error instanceof Error)) throw error
    console.warn('Navigation controls unavailable:', error.name)
  }
}
