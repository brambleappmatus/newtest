CREATE TABLE did_you_know (
    id INT PRIMARY KEY,
    fact_text TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert example data
INSERT INTO did_you_know (id, fact_text, category) VALUES
(1, 'Cats can''t taste sweetness - they lack sweet taste receptors', 'Animals'),
(2, 'Dogs can smell your feelings - their noses know!', 'Pets'),
(3, 'Kittens sleep 18-20 hours a day to support their growth', 'Animals'),
(4, 'Over 100,000 stray dogs are rescued annually in Europe', 'Shelters'),
(5, 'A dog''s sense of smell is 40 times better than humans', 'Pets'),
(6, 'Adopting a shelter pet saves two lives: theirs and the next rescue''s', 'Shelters'),
(7, 'Cats use their whiskers to detect objects in the dark', 'Animals'),
(8, 'In many European countries, shelters rely solely on donations', 'Shelters'),
(9, 'Dogs have unique nose prints, just like human fingerprints', 'Pets'),
(10, 'Kittens are born with closed eyes that open after 7-10 days', 'Animals'),
(11, 'A group of cats is called a clowder', 'Animals'),
(12, 'The average stay for a shelter animal in Europe is 6 months', 'Shelters'),
(13, 'Most shelter pets are given up due to financial difficulties', 'Shelters'),
(14, 'Fostering a pet reduces shelter overcrowding significantly', 'Shelters'),
(15, 'Cats spend 70% of their lives sleeping', 'Animals'),
(16, 'Dogs can understand up to 250 words and gestures', 'Pets'),
(17, 'Shelters need volunteers to help walk dogs daily', 'Shelters'),
(18, 'Puppies are born blind, deaf, and toothless', 'Animals'),
(19, 'Some cats can run up to 30 miles per hour', 'Animals'),
(20, 'Dogs sweat through their paw pads, not their tongue', 'Pets');

-- Enable RLS
ALTER TABLE did_you_know ENABLE ROW LEVEL SECURITY;

-- Create policy for read access
CREATE POLICY "Enable read access for all users" ON did_you_know
    FOR SELECT
    TO public
    USING (true);