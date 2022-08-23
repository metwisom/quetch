type QResponse = {
    then?: (cb: (res: any) => void) => Promise<void>,
    header?: (value: (() => Record<string, any>) | Record<string, any>) => QResponse
    query?: (value: (() => Record<string, any>) | Record<string, any>) => QResponse
}

export {QResponse};
