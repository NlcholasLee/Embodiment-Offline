// gtag监控
export function recordEvent(
   action: string, params: {
      event_category: string,
      event_lavel?: string,
      value?:number,
   }
) {
   window?.gtag('event', action, params)
}