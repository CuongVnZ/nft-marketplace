// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ERC721Enumerable  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private deployedAddress;

    mapping(uint256 => uint256) private _tokenPrices;
    mapping(uint256 => uint256) private _tokenImageIds; // Mapping to store NFT metadata

    constructor() ERC721("Pixel", "PIX") {}

    modifier onlyOwner() {
        require(msg.sender == deployedAddress, "Only contract owner can call this function");
        _;
    }

    function buy(uint256 tokenId) external payable {
        require(_exists(tokenId), "NFT doesn't exist");
        require(msg.value >= _tokenPrices[tokenId], "Insufficient ETH");

        address tokenOwner = ownerOf(tokenId);
        payable(tokenOwner).transfer(msg.value);
        _transfer(tokenOwner, msg.sender, tokenId);
    }

    function mint(uint256 price) external {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _tokenPrices[newTokenId] = price;
        _tokenImageIds[newTokenId] = _generateRandomMetadata(); // Store the metadata for the new NFT
    }

    function getInfo(uint256 tokenId) external view returns (uint256, uint256) {
        require(_exists(tokenId), "NFT doesn't exist");
        return (_tokenPrices[tokenId], _tokenImageIds[tokenId]);
    }

    function getAll() external view returns (uint256[] memory, uint256[] memory) {
        uint256 total = _tokenIds.current();
        uint256[] memory tokenPrices = new uint256[](total);
        uint256[] memory tokenImageIds = new uint256[](total);

        for (uint256 i = 0; i < total; i++) {
            uint256 tokenId = i + 1;
            tokenPrices[i] = _tokenPrices[tokenId];
            tokenImageIds[i] = _tokenImageIds[tokenId];
        }

        return (tokenPrices, tokenImageIds);
    }

    function getOwnedTokenIds(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ownedTokenIds = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            ownedTokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return ownedTokenIds;
    }

    // Utility

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    // Generate random metadata value between 1 and 10
    function _generateRandomMetadata() internal view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
        return (randomNumber % 10) + 1;
    }
}