class DocumentService {
  constructor(documentRepository, permissionService) {
    this.documentRepository = documentRepository;
    this.permissionService = permissionService;
  }

  async getDocument(documentId, currentUser) {
    await this.permissionService.assertCanRead(currentUser, documentId);
    const doc = await this.documentRepository.findById(documentId);
    if (!doc) {
      throw new Error('Document not found');
    }
    return doc;
  }
}

module.exports = DocumentService;
