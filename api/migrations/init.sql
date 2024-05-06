CREATE TABLE scores (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    artwork_id INT NOT NULL,
    score INT NOT NULL,
    UNIQUE(artwork_id)
);