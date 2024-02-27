

interface Vote {
    user: string
}
  
  export interface IComment {
    author?: string,
    user?: any,
    date?: Date,
    text?: string,
    content?: string,
    rating?: number, 
    raiting?: number,
    advantages?: string,
    disadvantages?: string,
    likes: Vote[],
    dislikes: Vote[],
    photos: string[],
    _id: string,
    video?: string,
    createdAt: Date,
    isLiked: number
  }