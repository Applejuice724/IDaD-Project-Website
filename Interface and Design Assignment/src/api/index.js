import { supabase } from '../supabase'

export const getCards = async (params = {}) => {
  let query = supabase.from('item').select('*, category:category_id(id, name), images:item_image(*)')

  if (params.search) query = query.ilike('name', `%${params.search}%`)
  if (params.category_id) query = query.eq('category_id', params.category_id)
  if (params.sort === 'name') query = query.order('name', { ascending: params.order !== 'desc' })
  else if (params.sort === 'likes') query = query.order('likes', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data, error } = await query
  if (error) throw error
  return { data }
}

export const getCard = async (id) => {
  const { data, error } = await supabase
    .from('item')
    .select('*, category:category_id(id, name), images:item_image(*), comments:item_comment(*, user:user_id(username, first_name))')
    .eq('id', id)
    .single()
  if (error) throw error
  return { data }
}

export const createCard = async (cardData) => {
  const { data, error } = await supabase.from('item').insert(cardData).select().single()
  if (error) throw error
  return { data }
}

export const updateCard = async (id, cardData) => {
  const { data, error } = await supabase.from('item').update(cardData).eq('id', id).select().single()
  if (error) throw error
  return { data }
}

export const deleteCard = async (id) => {
  const { error } = await supabase.from('item').delete().eq('id', id)
  if (error) throw error
}

export const toggleLike = async (itemId, userId) => {
  const { data: existing } = await supabase
    .from('item_like')
    .select('id')
    .eq('item_id', itemId)
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) {
    await supabase.from('item_like').delete().eq('id', existing.id)
  } else {
    await supabase.from('item_like').insert({ item_id: itemId, user_id: userId })
  }
}

export const postComment = async (itemId, userId, content) => {
  const { data, error } = await supabase
    .from('item_comment')
    .insert({ item_id: itemId, user_id: userId, content })
    .select('*, user:user_id(username, first_name)')
    .single()
  if (error) throw error
  return { data }
}

export const deleteComment = async (commentId) => {
  const { error } = await supabase.from('item_comment').delete().eq('id', commentId)
  if (error) throw error
}

export const getCategories = async () => {
  const { data, error } = await supabase.from('category').select('*')
  if (error) throw error
  return { data }
}

export const getProfile = async (id) => {
  const { data, error } = await supabase.from('public_users').select('*').eq('id', id).single()
  if (error) throw error
  return { data }
}

export const updateProfile = async (id, profileData) => {
  const { data, error } = await supabase.from('public_users').update(profileData).eq('id', id).select().single()
  if (error) throw error
  return { data }
}

export const toggleCollection = async (cardId, userId) => {
  const { data: existing } = await supabase
    .from('item_like')
    .select('id')
    .eq('item_id', cardId)
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) {
    await supabase.from('item_like').delete().eq('id', existing.id)
  } else {
    await supabase.from('item_like').insert({ item_id: cardId, user_id: userId })
  }
}
