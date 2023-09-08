interface contact {
    firstName: string | undefined;
    lastName: string | undefined;
}

export interface Message {
    createdAt: Date;
    message: string;
    isRead: boolean;
    spAccount : string;
    cde : string;
    rep : string;
    contact? : contact;
    pbDelai: boolean;
}