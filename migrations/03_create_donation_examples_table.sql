CREATE TABLE donation_examples (
    id INT PRIMARY KEY,
    example_text TEXT NOT NULL
);

-- Insert example data
INSERT INTO donation_examples (id, example_text) VALUES
(1, 'Buys dinner for hungry paws.'),
(2, 'Covers vet checkups for rescues.'),
(3, 'Funds vaccines for little ones.'),
(4, 'Provides soft beds for naptime.'),
(5, 'Supports spay and neuter clinics.'),
(6, 'Pays for squeaky toys and fun.'),
(7, 'Rescues strays and brings them home.'),
(8, 'Helps transport pets to new families.'),
(9, 'Covers grooming for fresh fur.'),
(10, 'Keeps kennels clean and comfy.'),
(11, 'Supports foster homes for care.'),
(12, 'Funds microchips for lost pets.'),
(13, 'Helps train pets to trust again.'),
(14, 'Covers emergency vet treatments.'),
(15, 'Buys special food for sensitive pets.'),
(16, 'Feeds tiny kittens without a mom.'),
(17, 'Comforts pets recovering from trauma.'),
(18, 'Teaches families about pet care.'),
(19, 'Stops fleas and ticks from spreading.'),
(20, 'Finds loving homes at adoption events.');

-- Enable RLS
ALTER TABLE donation_examples ENABLE ROW LEVEL SECURITY;

-- Create policy for read access
CREATE POLICY "Enable read access for all users" ON donation_examples
    FOR SELECT
    TO public
    USING (true);