import creatorDNAService from '../services/creatorDNAService.js';

/**
 * Trigger AI Creator DNA synthesis.
 * Route: POST /api/creator-dna/generate
 */
export const generateDNA = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const creatorDNA = await creatorDNAService.generateCreatorDNA(userId);

    res.status(200).json({
      status: 'success',
      data: {
        creatorDNA,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve current user's Creator DNA.
 * Route: GET /api/creator-dna
 */
export const getDNA = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const creatorDNA = await creatorDNAService.getCreatorDNA(userId);

    res.status(200).json({
      status: 'success',
      data: {
        creatorDNA,
      },
    });
  } catch (error) {
    next(error);
  }
};
