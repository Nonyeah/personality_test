export type Questions = (number | null)[]
export type Answers = Questions;
export interface UserAnswers { page: Answers, setpage:(param: Answers) => void }
export interface Responses {id: number, response: string, category: string}
export interface Menu {id: number, label: string, listItems: string[], prevState: PreviousState[], closePreviousTab: (id:number, isCurrentTabOpen:boolean) => void }
export interface ServerData {serverData: Array<number | null>[]}
export interface PreviousState {id: number, clickedTab: boolean}
export interface SendObject {results: Array<Answers>, name: string, email:string, resultsent:boolean, emailverified:string}
export interface MailOptions { from: string | undefined, to: string, subject: string, html?: string }