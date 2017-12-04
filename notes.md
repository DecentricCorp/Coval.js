


<!-- Actors:
C: Creator
S: Server(less)
U: UnLoq
O: Owner

Creation:
    C and S interact
        C and S exchange DAT channel info
    C creates 2 of 2 secret shares
        C stores share 1 to DAT of S (Unencrypted)
        C stores share 2 to DAT of C - encrypted with (share 1 + share 2)
    S creates 2 of 2 secret shares
        S stores S share 1 to DAT of C - encrypted with (C share 1)
        S stores S share 2 to DAT of S - encrypted with (S share 2) + (C share 1)
        S stores C share 1 to DAT of S - encrypted with (S share 2) + (C share 1)
    S combines C share 1 with S share 2 to generate Private key and Address
        S stores Address to Dat of C and Dat of S (Unencrypted)


Claim:
    O and U and (either C or S) interact -->







